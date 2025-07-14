'use strict';
if (typeof Levels === 'undefined') var Levels = {};

Levels.VehicleRacing = function()
{
    this.name = "VehicleRacing";
    this.title = "Corrida de Veículos";

    this.sampleSolution = "function controlFunction(vehicle){  \n  var v_ref = Math.max(.4*vehicle.lidarPoints[2].distance,10);\n  var v = vehicle.speed;\n  return {steering: 0.1*(vehicle.lidarPoints[0].distance - vehicle.lidarPoints[4].distance), acceleration: 10*(v_ref-v)};\n};";
    this.boilerPlateCode = "function controlFunction(vehicle){  \n  return {steering: 0, acceleration: 0};\n};";
    this.difficultyRating = 2;
    this.description = "Calcule o ângulo de direção [rad] e a aceleração [m/s²] adequados para o veículo. A aceleração lateral é limitada. Se entrar muito rápido em uma curva não conseguirá fazê-la.";
    ImageDataCache.load('img/track.png');
    this.model = new Models.Vehicle({trackImgURL: 'img/track.png', constantSpeed:false});
}


Levels.VehicleRacing.prototype.levelComplete = function()
{
    return Math.abs(this.model.x - 82) < 4 
        && Math.abs(this.model.y - 46) < 4;
}

Levels.VehicleRacing.prototype.levelFailed = function()
{
    return this.model.detectCollision();
}


Levels.VehicleRacing.prototype.simulate = function (dt, controlFunc)
{
    this.model.simulate (dt, controlFunc);
}

Levels.VehicleRacing.prototype.getSimulationTime = function() {return this.model.T;}

Levels.VehicleRacing.prototype.draw = function(ctx, canvas){this.model.draw(ctx, canvas);}

Levels.VehicleRacing.prototype.infoText = function(ctx, canvas){return this.model.infoText();}