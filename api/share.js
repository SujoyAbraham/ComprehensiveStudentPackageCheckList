import { get, set } from '@vercel/edge-config';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'POST') {
      // Create a new shared checklist
      const { userName, userProgress, sharedWith } = req.body;
      
      if (!userName || !userProgress) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Generate a unique share ID
      const shareId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      const sharedChecklist = {
        id: shareId,
        ownerName: userName,
        progress: userProgress,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        sharedWith: sharedWith || [],
        collaborators: [userName] // Owner is always a collaborator
      };

      // Store in Edge Config (limited storage, so we'll use a simple key)
      await set(`shared-${shareId}`, sharedChecklist);
      
      res.status(200).json({ 
        success: true, 
        shareId,
        shareUrl: `${req.headers.origin || 'https://your-app.vercel.app'}?share=${shareId}`
      });

    } else if (req.method === 'GET') {
      // Get shared checklist
      const { shareId } = req.query;
      
      if (!shareId) {
        return res.status(400).json({ error: 'Share ID required' });
      }

      const sharedChecklist = await get(`shared-${shareId}`);
      
      if (!sharedChecklist) {
        return res.status(404).json({ error: 'Shared checklist not found' });
      }

      res.status(200).json(sharedChecklist);

    } else if (req.method === 'PUT') {
      // Update shared checklist
      const { shareId, userName, userProgress } = req.body;
      
      if (!shareId || !userName || !userProgress) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const existingChecklist = await get(`shared-${shareId}`);
      
      if (!existingChecklist) {
        return res.status(404).json({ error: 'Shared checklist not found' });
      }

      // Merge progress data
      const updatedProgress = { ...existingChecklist.progress, ...userProgress };
      
      // Add user to collaborators if not already there
      const collaborators = existingChecklist.collaborators.includes(userName) 
        ? existingChecklist.collaborators 
        : [...existingChecklist.collaborators, userName];

      const updatedChecklist = {
        ...existingChecklist,
        progress: updatedProgress,
        lastUpdated: new Date().toISOString(),
        lastUpdatedBy: userName,
        collaborators
      };

      await set(`shared-${shareId}`, updatedChecklist);
      
      res.status(200).json({ success: true, checklist: updatedChecklist });

    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('Share API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}