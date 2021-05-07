// When you include Matter.js into your project, you get access to a Matter obj
const {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  MouseConstraint,
  Mouse,
} = Matter;

const width = 800;
const height = 600;

const engine = Engine.create();
// world is created along with the Engine obj
// A world is a snapshot of all the different shapes we have
const { world } = engine;
// Render shows content on the screen
const render = Render.create({
  // Tells Render where to put our representation of the world
  // Adds a new element to the body element
  element: document.body,
  engine: engine,
  // Dimensions for the canvas
  options: {
    wireframes: false,
    width,
    height,
  },
});
Render.run(render);
// The Runner coordinates updates between the engine and the world
Runner.run(Runner.create(), engine);

// Adds the ability to manipulate objs with your mouse
World.add(
  world,
  MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas),
  })
);

// Walls
const walls = [
  Bodies.rectangle(400, 0, 800, 40, {
    isStatic: true,
  }),
  Bodies.rectangle(400, 600, 800, 40, {
    isStatic: true,
  }),
  Bodies.rectangle(0, 300, 40, 600, {
    isStatic: true,
  }),
  Bodies.rectangle(800, 300, 40, 600, {
    isStatic: true,
  }),
];
World.add(world, walls);

// Random Shapes
for (let i = 0; i < 50; i++) {
  if (Math.random() > 0.5) {
    World.add(
      world,
      Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50)
    );
  } else {
    World.add(
      world,
      Bodies.circle(Math.random() * width, Math.random() * height, 35, {
        render: {
          fillStyle: "green",
        },
      })
    );
  }
}

// SAMPLE: Create a shape on the canvas
// // rectangle(posX, posY, width, height) **posX and Y are the center of the obj
// const shape = Bodies.rectangle(200, 200, 50, 50, {
//   isStatic: true, // Keeps obj from moving (gravity is enabled by default)
// });
// // You must add any shapes created w/Bodies to World for them to show up
// World.add(world, shape);
