'use strict';
if (typeof Levels === 'undefined') var Levels = {};

Levels.BallOnPlatformEdgeBalance = function()
{
    this.name = "BallOnPlatformEdgeBalance";
    this.title = "Bola na Plataforma: Equilíbrio na Borda";
    this.boilerPlateCode = "function controlFunction(ball, piston, hinge, T)\n{\n  return {pistonAcceleration: 100 * Math.sin(20*T), hingeAcceleration: 100 * Math.sin(17 * T)};\n}";
    this.sampleSolution = "function controlFunction(ball, piston, hinge, T)\n{\n  if(T < 9)\n  {\n    var hinge_angle_target = 0.12 * ball.vx + 0.05 * (ball.x + 1.17);\n    var piston_speed_target = 0;\n    if((ball.y - (piston.length - 5.15)) < 1.0 && ball.vy*ball.vy > 0.1)\n    {\n      piston_speed_target = 0.5 * ball.vy;\n    }\n    piston_speed_target += 1.0 * (1.7 - piston.length);\n    var hinge_speed_target = 10 * (hinge_angle_target - hinge.angle);\n  }\n  else if(T < 9.33)\n  {\n    var piston_speed_target = 10;\n    var hinge_speed_target = 0;\n  }\n  else if(T < 9.37)\n  {\n    var piston_speed_target = 0;\n    var hinge_speed_target = 0;\n  }\n  else if(T < 9.85)\n  {\n    var piston_speed_target = 11 * (1.9 - piston.length);\n    var hinge_speed_target = 11 * (-0.55 - hinge.angle);\n  }\n  else\n  {\n    var edge_x = -1.5 * Math.cos(hinge.angle) -0.15 * Math.sin(hinge.angle);\n    var piston_speed_target = 0;\n    var hinge_speed_target = -1.5 * ball.vx + 10.0 * (edge_x - ball.x) - 0.2 * (1.2 + ball.x);\n  }\n  \n  var pistonAcceleration = 40 * (piston_speed_target - piston.speed);\n  var hingeAcceleration = 40 * (hinge_speed_target - hinge.speed);\n  return {pistonAcceleration:pistonAcceleration, hingeAcceleration:hingeAcceleration};\n}";
    this.difficultyRating = 4;
    this.description = "Leve a bola até a borda esquerda da plataforma e mantenha-a equilibrada ali. A borda esquerda deve estar levantada, ou seja, o ângulo da articulação deve ser negativo.";
    this.model = new Models.BouncingBallPlatform(
    {
        ball_x: 1.0,
        ball_y: -1.0,
        ball_dx: 0.0,
        ball_dy: 0.0,
        ball_radius: 0.2,
        platform_base_y: -5.0,
        piston_length: 1.9,
        piston_speed: 0.0,
        piston_length_min: 1.5,
        piston_length_max: 2.3,
        paddle_half_width: 1.5,
        paddle_thickness: 0.15,
        hinge_angle: -0.5,
        hinge_angular_speed: 0.0,
        hinge_angle_max: 0.7,
        g: 9.81,
        T: 0,
    });
}


Levels.BallOnPlatformEdgeBalance.prototype.levelComplete = function(){return this.model.edge_balance_win_condition_counter > 500;}


Levels.BallOnPlatformEdgeBalance.prototype.levelFailed = function(){return false;}

Levels.BallOnPlatformEdgeBalance.prototype.simulate = function (dt, controlFunc)
{
    this.model.simulate (dt, controlFunc);
}

Levels.BallOnPlatformEdgeBalance.prototype.getSimulationTime = function() {return this.model.T;}

Levels.BallOnPlatformEdgeBalance.prototype.draw = function(ctx, canvas){this.model.draw(ctx, canvas);}

Levels.BallOnPlatformEdgeBalance.prototype.infoText = function(ctx, canvas){return this.model.infoText();}