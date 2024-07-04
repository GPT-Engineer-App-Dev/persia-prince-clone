import React, { useEffect, useRef } from "react";

const Index = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Canvas dimensions
    canvas.width = 800;
    canvas.height = 600;

    // Character properties
    const character = {
      x: 50,
      y: 500,
      width: 50,
      height: 50,
      speed: 5,
      dx: 0,
      dy: 0,
      gravity: 0.5,
      jumpStrength: -10,
      onGround: false,
    };

    // Platform properties
    const platforms = [
      { x: 0, y: 550, width: 1600, height: 50 }, // Extended platform
      { x: 200, y: 450, width: 100, height: 20 },
      { x: 400, y: 350, width: 100, height: 20 },
      { x: 800, y: 450, width: 100, height: 20 }, // Additional platforms
      { x: 1200, y: 350, width: 100, height: 20 },
    ];

    // Key press events
    const keys = {
      right: false,
      left: false,
      up: false,
    };

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "d") keys.right = true;
      if (e.key === "ArrowLeft" || e.key === "a") keys.left = true;
      if (e.key === "ArrowUp" || e.key === "w") keys.up = true;
    });

    document.addEventListener("keyup", (e) => {
      if (e.key === "ArrowRight" || e.key === "d") keys.right = false;
      if (e.key === "ArrowLeft" || e.key === "a") keys.left = false;
      if (e.key === "ArrowUp" || e.key === "w") keys.up = false;
    });

    // Update character position
    const update = () => {
      // Horizontal movement
      if (keys.right) character.dx = character.speed;
      else if (keys.left) character.dx = -character.speed;
      else character.dx = 0;

      // Vertical movement
      if (keys.up && character.onGround) {
        character.dy = character.jumpStrength;
        character.onGround = false;
      }

      character.dy += character.gravity;
      character.x += character.dx;
      character.y += character.dy;

      // Collision detection
      character.onGround = false;
      platforms.forEach((platform) => {
        if (
          character.x < platform.x + platform.width &&
          character.x + character.width > platform.x &&
          character.y < platform.y + platform.height &&
          character.y + character.height > platform.y
        ) {
          if (character.dy > 0) {
            character.y = platform.y - character.height;
            character.dy = 0;
            character.onGround = true;
          }
        }
      });

      // Boundary detection
      if (character.x < 0) character.x = 0;
      if (character.y + character.height > canvas.height) {
        character.y = canvas.height - character.height;
        character.dy = 0;
        character.onGround = true;
      }
    };

    // Draw character and platforms
    const draw = (cameraOffsetX) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw character
      ctx.fillStyle = "blue";
      ctx.fillRect(character.x - cameraOffsetX, character.y, character.width, character.height);

      // Draw platforms
      ctx.fillStyle = "green";
      platforms.forEach((platform) => {
        ctx.fillRect(platform.x - cameraOffsetX, platform.y, platform.width, platform.height);
      });
    };

    // Game loop
    const loop = () => {
      update();

      // Calculate camera offset
      const cameraOffsetX = Math.max(0, character.x - canvas.width / 2);

      draw(cameraOffsetX);
      requestAnimationFrame(loop);
    };

    loop();
  }, []);

  return (
    <div className="flex justify-center items-center h-full">
      <canvas ref={canvasRef} className="border border-gray-300"></canvas>
    </div>
  );
};

export default Index;