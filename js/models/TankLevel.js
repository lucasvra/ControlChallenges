'use strict';
if (typeof Models === 'undefined') var Models = {};

Models.TankLevel = function(params)
{
    var nVars = Object.keys(this.vars).length;
    for(var i = 0; i < nVars; i++)
    {
        var key = Object.keys(this.vars)[i];
        this[key] = (typeof params[key] == 'undefined')?this.vars[key]:params[key];
    }
}

Models.TankLevel.prototype.vars =
{
    area: 1.0,
    level: 0.5,
    valve: 0.0,
    valve_cmd: 0.0,
    maxInFlow: 1.0,
    outflowCoeff: 0.5,
    targetLevel: 1.0,
    holdTimer: 0.0,
    T: 0,
};

Models.TankLevel.prototype.simulate = function (dt, controlFunc)
{
    var input = controlFunc({level:this.level,targetLevel:this.targetLevel,T:this.T});
    if(typeof input != 'number')
        throw "Erro: a controlFunction deve retornar um n\u00famero.";
    this.valve_cmd = Math.max(0, Math.min(1, input));
    integrationStep(this, ['level', 'valve'], dt);

    if(Math.abs(this.level - this.targetLevel) < 0.02 && Math.abs(this.valve_cmd - this.valve) < 0.05)
        this.holdTimer += dt;
    else
        this.holdTimer = 0;
}

Models.TankLevel.prototype.ode = function (x) {
    var level = x[0];
    var valve = x[1];
    var inflow = this.maxInFlow * valve;
    var outflow = this.outflowCoeff * Math.sqrt(Math.max(level,0));
    return [ (inflow - outflow)/this.area, 5.0 * (this.valve_cmd - valve) ];
}

Models.TankLevel.prototype.draw = function (ctx, canvas) {
    var tankWidth = 2.0;
    var tankHeight = 2.0;
    ctx.save();
    ctx.translate(-tankWidth/2,0);
    ctx.strokeStyle = '#333366';
    ctx.lineWidth = 0.05;
    ctx.strokeRect(0,0,tankWidth,tankHeight);

    ctx.fillStyle = '#44aaff';
    var h = Math.max(0, Math.min(tankHeight, this.level));
    ctx.fillRect(0,0,tankWidth,h);

    ctx.strokeStyle = '#ff00ff';
    drawLine(ctx,0,this.targetLevel,tankWidth,this.targetLevel,0.02);

    ctx.restore();
}

Models.TankLevel.prototype.infoText = function ()
{
    return  "tank.level = " + round(this.level,2)
        + "\ntank.valve = " + round(this.valve,2)
        + "\ntank.T     = " + round(this.T,2);
}
