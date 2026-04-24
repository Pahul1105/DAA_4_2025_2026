const mapData = {
    locations: {
        'Home': { x: 50, y: 100 },
        'School': { x: 200, y: 80 },
        'Mall': { x: 350, y: 150 },
        'Hospital': { x: 450, y: 100 },
        'Park': { x: 300, y: 300 },
        'Library': { x: 150, y: 250 },
        'Coffee Shop': { x: 400, y: 250 },
        'Train Station': { x: 500, y: 350 }
    },
    
    edges: [
        { from: 'Home', to: 'School', weight: 5 },
        { from: 'Home', to: 'Library', weight: 8 },
        { from: 'School', to: 'Mall', weight: 7 },
        { from: 'School', to: 'Park', weight: 12 },
        { from: 'Mall', to: 'Hospital', weight: 6 },
        { from: 'Mall', to: 'Coffee Shop', weight: 5 },
        { from: 'Mall', to: 'Park', weight: 8 },
        { from: 'Hospital', to: 'Train Station', weight: 10 },
        { from: 'Hospital', to: 'Coffee Shop', weight: 7 },
        { from: 'Library', to: 'Park', weight: 6 },
        { from: 'Library', to: 'Home', weight: 8 },
        { from: 'Park', to: 'Coffee Shop', weight: 9 },
        { from: 'Park', to: 'Train Station', weight: 12 },
        { from: 'Coffee Shop', to: 'Train Station', weight: 5 },
        { from: 'School', to: 'Library', weight: 4 }
    ]
};

class DijkstraGraph {
    constructor(locations, edges) {
        this.locations = locations;
        this.graph = {};
        this.nodes = Object.keys(locations);
        
        this.nodes.forEach(node => {
            this.graph[node] = [];
        });
        
        edges.forEach(edge => {
            this.graph[edge.from].push({ node: edge.to, weight: edge.weight });
            this.graph[edge.to].push({ node: edge.from, weight: edge.weight });
        });
    }
    
    dijkstra(start, end) {
        const distances = {};
        const previous = {};
        const unvisited = new Set();
        const visited = [];
        const steps = [];
        
        this.nodes.forEach(node => {
            distances[node] = Infinity;
            previous[node] = null;
            unvisited.add(node);
        });
        
        distances[start] = 0;
        
        while (unvisited.size > 0) {
            let current = null;
            let minDist = Infinity;
            
            for (let node of unvisited) {
                if (distances[node] < minDist) {
                    minDist = distances[node];
                    current = node;
                }
            }
            
            if (current === null || distances[current] === Infinity) {
                break;
            }
            
            unvisited.delete(current);
            visited.push(current);
            
            steps.push({
                current: current,
                visited: [...visited],
                distances: { ...distances },
                previous: { ...previous }
            });
            
            for (let neighbor of this.graph[current]) {
                if (unvisited.has(neighbor.node)) {
                    const newDist = distances[current] + neighbor.weight;
                    if (newDist < distances[neighbor.node]) {
                        distances[neighbor.node] = newDist;
                        previous[neighbor.node] = current;
                    }
                }
            }
        }
        
        const path = [];
        let current = end;
        while (current !== null) {
            path.unshift(current);
            current = previous[current];
        }
        
        return {
            path: path,
            distance: distances[end],
            steps: steps,
            distances: distances
        };
    }
}

class GraphVisualizer {
    constructor(canvasId, mapData) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.mapData = mapData;
        this.nodeRadius = 30;
        this.animating = false;
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width - 40;
        this.canvas.height = 600;
        this.scale = Math.min(this.canvas.width / 600, this.canvas.height / 400);
    }
    
    drawGraph(highlightedNodes = {}, pathEdges = []) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.strokeStyle = '#ccc';
        this.ctx.lineWidth = 2;
        
        for (let edge of this.mapData.edges) {
            const from = this.mapData.locations[edge.from];
            const to = this.mapData.locations[edge.to];
            
            const isPathEdge = pathEdges.some(e => 
                (e[0] === edge.from && e[1] === edge.to) || 
                (e[0] === edge.to && e[1] === edge.from)
            );
            
            if (isPathEdge) {
                this.ctx.strokeStyle = '#2ecc71';
                this.ctx.lineWidth = 4;
            } else {
                this.ctx.strokeStyle = '#bbb';
                this.ctx.lineWidth = 2;
            }
            
            this.ctx.beginPath();
            this.ctx.moveTo(from.x, from.y);
            this.ctx.lineTo(to.x, to.y);
            this.ctx.stroke();
            
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;
            this.ctx.fillStyle = '#666';
            this.ctx.font = 'bold 12px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(edge.weight, midX, midY - 5);
        }
        
        for (let [name, pos] of Object.entries(this.mapData.locations)) {
            let color = '#e0e0e0';
            
            if (highlightedNodes[name] === 'start') {
                color = '#4ECDC4';
            } else if (highlightedNodes[name] === 'end') {
                color = '#FF6B6B';
            } else if (highlightedNodes[name] === 'visited') {
                color = '#FFD700';
            } else if (highlightedNodes[name] === 'current') {
                color = '#667eea';
            }
            
            this.ctx.beginPath();
            this.ctx.arc(pos.x, pos.y, this.nodeRadius, 0, 2 * Math.PI);
            this.ctx.fillStyle = color;
            this.ctx.fill();
            this.ctx.strokeStyle = '#333';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            this.ctx.fillStyle = '#000';
            this.ctx.font = 'bold 12px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(name, pos.x, pos.y);
        }
    }
}

class GPSNavigator {
    constructor() {
        this.graph = new DijkstraGraph(mapData.locations, mapData.edges);
        this.visualizer = new GraphVisualizer('graphCanvas', mapData);
        this.currentRoute = null;
        this.animationStep = 0;
        this.animationRunning = false;
        
        this.initializeUI();
        this.attachEventListeners();
        this.loadSavedRoute();
    }
    
    initializeUI() {
        const locations = Object.keys(mapData.locations);
        const selects = ['startLocation', 'endLocation'];
        
        selects.forEach(id => {
            const select = document.getElementById(id);
            locations.forEach(loc => {
                const option = document.createElement('option');
                option.value = loc;
                option.textContent = loc;
                select.appendChild(option);
            });
        });
        
        this.visualizer.drawGraph();
    }
    
    attachEventListeners() {
        document.getElementById('findRouteBtn').addEventListener('click', () => this.findRoute());
        document.getElementById('animateBtn').addEventListener('click', () => this.startAnimation());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
    }
    
    findRoute() {
        const start = document.getElementById('startLocation').value;
        const end = document.getElementById('endLocation').value;
        
        if (!start || !end) {
            alert('Please select both start and destination!');
            return;
        }
        
        if (start === end) {
            alert('Start and destination must be different!');
            return;
        }
        
        this.currentRoute = this.graph.dijkstra(start, end);
        
        if (this.currentRoute.path[0] !== start) {
            alert('No route found!');
            return;
        }
        
        this.displayResults(start, end);
        this.saveRoute(start, end, this.currentRoute);
        this.drawRoute(start, end);
        
        document.getElementById('animateBtn').disabled = false;
    }
    
    displayResults(start, end) {
        const path = this.currentRoute.path.join(' → ');
        const distance = this.currentRoute.distance;
        
        document.getElementById('resultStart').textContent = start;
        document.getElementById('resultEnd').textContent = end;
        document.getElementById('resultPath').textContent = path;
        document.getElementById('resultDistance').textContent = `${distance} km`;
        
        document.getElementById('resultsPanel').classList.remove('hidden');
    }
    
    drawRoute(start, end) {
        const highlighted = {};
        highlighted[start] = 'start';
        highlighted[end] = 'end';
        
        for (let node of this.currentRoute.steps[this.currentRoute.steps.length - 1].visited) {
            if (node !== start && node !== end) {
                highlighted[node] = 'visited';
            }
        }
        
        const pathEdges = [];
        for (let i = 0; i < this.currentRoute.path.length - 1; i++) {
            pathEdges.push([this.currentRoute.path[i], this.currentRoute.path[i + 1]]);
        }
        
        this.visualizer.drawGraph(highlighted, pathEdges);
    }
    
    startAnimation() {
        if (!this.currentRoute) return;
        
        this.animationRunning = true;
        this.animationStep = 0;
        document.getElementById('animateBtn').disabled = true;
        document.getElementById('animationStatus').classList.remove('hidden');
        
        this.animate();
    }
    
    animate() {
        if (this.animationStep >= this.currentRoute.steps.length) {
            const start = document.getElementById('startLocation').value;
            const end = document.getElementById('endLocation').value;
            this.drawRoute(start, end);
            document.getElementById('animateBtn').disabled = false;
            document.getElementById('animationStatus').classList.add('hidden');
            this.animationRunning = false;
            return;
        }
        
        const step = this.currentRoute.steps[this.animationStep];
        const start = document.getElementById('startLocation').value;
        const end = document.getElementById('endLocation').value;
        
        const highlighted = {};
        highlighted[start] = 'start';
        highlighted[end] = 'end';
        highlighted[step.current] = 'current';
        
        for (let node of step.visited) {
            if (node !== start && node !== end && node !== step.current) {
                highlighted[node] = 'visited';
            }
        }
        
        this.visualizer.drawGraph(highlighted, []);
        
        document.getElementById('stepInfo').textContent = 
            `Step ${this.animationStep + 1} / ${this.currentRoute.steps.length}`;
        const progress = ((this.animationStep + 1) / this.currentRoute.steps.length) * 100;
        document.getElementById('progressFill').style.width = progress + '%';
        
        this.animationStep++;
        setTimeout(() => this.animate(), 800);
    }
    
    saveRoute(start, end, route) {
        const routeData = {
            start,
            end,
            path: route.path.join(' → '),
            distance: route.distance,
            timestamp: new Date().toLocaleString()
        };
        
        localStorage.setItem('lastRoute', JSON.stringify(routeData));
        this.displaySavedRoute(routeData);
    }
    
    loadSavedRoute() {
        const saved = localStorage.getItem('lastRoute');
        if (saved) {
            const route = JSON.parse(saved);
            this.displaySavedRoute(route);
        }
    }
    
    displaySavedRoute(route) {
        const savedDiv = document.getElementById('savedRoute');
        const text = `${route.start} → ${route.end}: ${route.distance} km`;
        document.getElementById('savedRouteText').textContent = text;
        savedDiv.classList.remove('hidden');
    }
    
    reset() {
        this.currentRoute = null;
        this.animationStep = 0;
        this.animationRunning = false;
        
        document.getElementById('startLocation').value = '';
        document.getElementById('endLocation').value = '';
        document.getElementById('resultsPanel').classList.add('hidden');
        document.getElementById('animationStatus').classList.add('hidden');
        document.getElementById('animateBtn').disabled = true;
        
        this.visualizer.drawGraph();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new GPSNavigator();
});
