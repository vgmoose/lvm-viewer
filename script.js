function go()
{
    location.hash = "/" + document.getElementById('pvs').value.split("\n").join("#n") + "#/" + document.getElementById('vgs').value.split("\n").join("#n") + "#/" + document.getElementById('lvs').value.split("\n").join("#n") + "#/" + document.getElementById('fss').value.split("\n").join("#n");
}

function snap()
{
    document.getElementById('snap').setAttribute("type", "hidden");
    document.getElementById('redo').setAttribute("type", "hidden");
    
    if (document.getElementById('header').innerHTML == "<h2>LVM Viewer</h2>")
        document.getElementById('header').innerHTML = "<br><br>";
    
    html2canvas(document.getElementById('main'), {
                onrendered: function(canvas) {
                window.open(canvas.toDataURL(), "_blank");
                document.getElementById('snap').setAttribute("type", "submit");
                document.getElementById('redo').setAttribute("type", "submit");
                
                if (document.getElementById('header').innerHTML == "<br><br>")
                    document.getElementById('header').innerHTML = "<h2>LVM Viewer</h2>";
                }
                });

}

function redo()
{
    location.href = location.pathname;
}

function info()
{
    var string = "";
    
    for (var x=0; x<this.length; x++)
        string += this[x].name + ": " + this[x].size + "<br \>";
    
    return string;
}

function keyDown(e)
{
    if (e.keyCode == 13)
        submitTitle();
}

function submitTitle()
{
    if (document.getElementById('typetitle').value == "")
        return;
    
    document.getElementById('header').innerHTML = "<h2>"+document.getElementById('typetitle').value+"</h2>";
    setTimeout("document.getElementById('header').onclick = titleH2;", 100);
    
}

function titleH2()
{
    this.onclick = null;
    this.innerHTML = "<br /><input type='text' id='typetitle' placeholder='echo \"LVM Setup for $(hostname)\"' style='width:250px;'></input><input type='submit' value='Set' id='sub2' onclick='submitTitle()'></input><br /><br />";
    document.getElementById('typetitle').focus();
    document.getElementById('typetitle').onkeydown = keyDown;
    
}

function loadLVM()
{
    if (location.hash != "" && location.hash != "#")
    {
        document.getElementById('header').innerHTML = "<h2>LVM Viewer</h2>";
        
        document.getElementById('header').onclick = titleH2;
        
        var vgsElement = document.getElementById('vgs').parentElement;
        var lvsElement = document.getElementById('lvs').parentElement;
        var pvsElement = document.getElementById('pvs').parentElement;
        var fssElement = document.getElementById('fss').parentElement;
        
        
        
        var strings = location.hash.replace(/%20/g, " ");
        strings =strings.split("#/");
//        document.getElementById('main').style.backgroundColor = "white";
        
        // Volume Groups
        var vgsdata = strings[2].replace(/ /g, "").split("#n");
        var vgs = [];
        
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
        
        // Physical Volumes
        var pvsdata = strings[1].replace(/ /g, "").split("#n");
        var pvs = [];
        
        pvs.info = info;
        
        for (var x=0; x<pvsdata.length; x++)
        {
            var cur = pvsdata[x].split(":");
            
            if (cur == "")
                continue;
            
            var vol = {};
            vol.name = cur[0];
            vol.size = cur[2];
            
            pvs.push(vol);
            
        }

        var a = document.getElementById('main');
        
//        document.getElementById('vgs_box')
        
        document.getElementById('go').setAttribute("type", "hidden");
        document.getElementById('snap').setAttribute("type", "submit");
        document.getElementById('redo').setAttribute("type", "submit");
        
        vgsElement.className += " volume_view";
        lvsElement.className += " volume_view";
        pvsElement.className += " volume_view";
        fssElement.className += " volume_view";
        
        var sumvg = 0;
        
        for (var x=0; x<vgs.length; x++)
        {
            sumvg += parseInt(vgs[x].size);
            vgs[x].gbsize = Math.round(parseInt(vgs[x].size)/1048576);
        }
        
        var output = "";
        
        for (var x=0; x<vgs.length; x++)
        {
            var percent = (parseInt(vgs[x].size) / sumvg) * 390 - 1;
            console.log((parseInt(vgs[x].size) / sumvg));

            output += "<div class='vol' style='width:"+percent;
            output += "px'><a href='aa'>";
            output += vgs[x].name +" (" + vgs[x].gbsize + " GB)</a></div>";
            
            if ((x+1) != vgs.length)
                output += "<div class='vol spacer'></div>";
        }
        
        console.log(output);
        vgsElement.innerHTML = output;
        
//        vgsElement.innerHTML = "<div class='vol' style='width:260px'><a href='aa'>purin (250 GB)</a></div><div class='vol spacer'></div><div class='vol' style='width:129px'><a href='aa'>yume (40 GB)</a></div>";
        lvsElement.innerHTML = "";
        pvsElement.innerHTML = "";
        fssElement.innerHTML = "";
        
        
        
//
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

