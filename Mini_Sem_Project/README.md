# Mini GPS Navigation System

A small navigation visualizer built with HTML, CSS, and vanilla JavaScript. It uses Dijkstra's algorithm to calculate the shortest path between predefined locations and shows the route on a canvas map.

## Features

- Shortest-path route calculation with Dijkstra's algorithm
- Interactive location selection
- Step-by-step pathfinding animation
- Canvas-based graph visualization
- Saved last route using `localStorage`
- Simple static deployment on Vercel

## Run Locally

```bash
npm install
npm start
```

Open the URL printed in the terminal.

## Deploy to Vercel

```bash
vercel
```

For a production deployment:

```bash
vercel --prod
```

## Project Structure

```text
gps-nav-system/
├── index.html
├── style.css
├── script.js
├── server.js
├── package.json
└── README.md
```

## Live Demo

https://gps-nav-system.vercel.app

## 🔧 Customization

### Add More Locations

Edit `script.js` in the `mapData` object:

```javascript
mapData.locations = {
    'Location1': { x: 50, y: 100 },
    'Location2': { x: 200, y: 200 },
    // Add more...
};
```

### Add More Roads

Edit the edges array:

```javascript
mapData.edges = [
    { from: 'Location1', to: 'Location2', weight: 5 },
    // Add more...
];
```

### Change Colors

Edit the color constants in `script.js`:

```javascript
// In GraphVisualizer.drawGraph():
if (highlightedNodes[name] === 'start') {
    color = '#4ECDC4'; // Change this color
}
```

---

## 🐛 Troubleshooting

### Issue: Page loads but nothing appears
**Solution:** Check browser console for errors (F12). Ensure JavaScript is enabled.

### Issue: Route not found between two locations
**Solution:** This is correct - if nodes are disconnected, no path exists. Check map connectivity.

### Issue: Animation is too fast/slow
**Solution:** Edit the timeout in `script.js` line ~320:
```javascript
setTimeout(() => this.animate(), 800); // Change 800 to make faster/slower
```

### Issue: Canvas is too small/large
**Solution:** Edit `#graphCanvas` height in `style.css`:
```css
#graphCanvas {
    height: 600px; /* Change this value */
}
```

---

## 📊 Sample Routes

Try these for demonstration:

| Start | End | Expected Distance |
|-------|-----|-------------------|
| Home | Hospital | 21 km |
| School | Train Station | 29 km |
| Library | Coffee Shop | 15 km |
| Home | Train Station | 40 km |

---

## 🎓 Academic Use

This project demonstrates:
- ✅ Graph data structures (adjacency list)
- ✅ Dijkstra's shortest path algorithm
- ✅ Canvas-based visualization
- ✅ Event-driven programming
- ✅ LocalStorage for persistence
- ✅ Responsive web design
- ✅ Algorithm animation

Perfect for:
- Algorithm course projects
- Data structures assignments
- Frontend development practice
- Interview preparation

---

## 📝 License

MIT License - Feel free to use and modify!

---

## 🙋 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Ensure all files are in the same directory
4. Clear browser cache and reload

---

## 🎉 Deployment Links

Once deployed on Vercel, your URL will be:
```
https://your-project-name.vercel.app
```

You can customize the project name during deployment!

---

**Happy navigating! 🗺️✨**

---

## Quick Deployment Summary

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Navigate to project
cd gps-nav-system

# 3. Deploy (answer prompts)
vercel

# 4. Done! Your app is live 🎉
```

That's it! Your Mini GPS Navigation System is now live on the internet!
