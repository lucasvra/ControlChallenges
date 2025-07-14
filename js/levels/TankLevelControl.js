'use strict';
if (typeof Levels === 'undefined') var Levels = {};

Levels.TankLevelControl = function()
{
    this.name = "TankLevelControl";
    this.title = "Controle de N\u00edvel do Tanque";
    this.boilerPlateCode = "function controlFunction(tank){\n  return 0.5;\n};";
    this.sampleSolution = "var integral = 0;\nfunction controlFunction(tank){\n  var erro = tank.targetLevel - tank.level;\n  if(Math.abs(erro) < 0.5) integral += 0.02 * erro;\n  var valv = 0.8 * erro + 0.5 * integral;\n  monitor('erro',erro);\n  monitor('integral',integral);\n  monitor('valve',valv);\n  return valv;\n};";
    this.difficultyRating = 1;
    this.description = "Mantenha o n\u00edvel (linha magenta) por 5 segundos.";
    this.model = new Models.TankLevel({});
}

Levels.TankLevelControl.prototype.levelComplete = function(){return this.model.holdTimer > 5;}

Levels.TankLevelControl.prototype.levelFailed = function(){return false;}

Levels.TankLevelControl.prototype.simulate = function (dt, controlFunc)
{ this.model.simulate (dt, controlFunc); }

Levels.TankLevelControl.prototype.getSimulationTime = function() {return this.model.T;}

Levels.TankLevelControl.prototype.draw = function(ctx, canvas){this.model.draw(ctx, canvas);}

Levels.TankLevelControl.prototype.infoText = function(ctx, canvas){return this.model.infoText();}
