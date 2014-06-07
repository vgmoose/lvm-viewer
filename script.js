function go()
{
    location.hash = "/" + document.getElementById('pvs').value.split("\n").join("#n") + "#/" + document.getElementById('vgs').value.split("\n").join("#n") + "#/" + document.getElementById('lvs').value.split("\n").join("#n") + "#/" + document.getElementById('fss').value.split("\n").join("#n");
}

function info()
{
    var string = "";
    
    for (var x=0; x<this.length; x++)
        string += this[x].name + ": " + this[x].size + "<br \>";
    
    return string;
}

function loadLVM()
{
    if (location.hash != "" && location.hash != "#")
    {
        var strings = location.hash.split("#/");
        document.getElementById('main').style.backgroundColor = "white";
        
        var vgsdata = strings[2].replace(/ /g, "").split("#n");
        vgs = [];
        
        vgs.info = info;

        for (var x=0; x<vgsdata.length; x++)
        {
            var cur = vgsdata[x].split(":");
            
            if (cur == "")
                continue;
            
            var vol = {};
            vol.name = cur[0];
            vol.size = cur[11];
            
            vgs.push(vol);
            
        }
        
        console.log(vgs);
        document.getElementById('main').innerHTML = vgs.info();
        
//        var pvs = strings[1].split(":");
//        var vgs = strings[2].split(":");
//        var lvs = strings[3].split(":");
//        var fss = strings[4].split(":");
//        
//        var pv = {};
//        var vg = {};
//        var lv = {};
//        var fs = {};
//        
//        // set names
//        pv.name = pvs[0];
//        vg.name = vgs[0];
//        lv.name = lvs[0];
//        
//        // set sizes (in KB)
//        pv.size = pvs[2];
//        vg.size = vgs[2];
//        lv.size = lvs[2];
//        
//        //
        
        
    }
}

