var camera;
var scene;
var renderer;
var mesh;
var coins = new Array(9);  
var velocity = [0,0,0,0,0,0,0,0,0];
var holes = new Array(4);
var striker_mesh;
var striker_speed=20;
var striker_angle=0;
var shoot_status=0;
var time=0;
var striker_flag=false;
var coins_flag1=false;
var coins_flag2=false;
var hole_flag=false;
var coin_view_flag=false;
var i;
var j;
var k;
var v;
var l;
var score=0;
init();
animate();
function init() {
  
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0,50,40);
    camera.lookAt(scene.position);
//    camera.up.set(0,0,-1);
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 1, 1 ).normalize();
    scene.add(light);

    var geometry = new THREE.CubeGeometry( 75, 10, 75);
    var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('js/carrom.jpg') } );
    mesh = new THREE.Mesh(geometry, material );
    mesh.position.set(0,0,0);
    scene.add( mesh );

    var whitecoin1_geo = new THREE.CylinderGeometry(2,2,1,32);
    var whitecoin1_material = new THREE.MeshPhongMaterial({ ambient: 0x050505, color: 0xffffff, specular: 0x555555, shininess: 30});
    coins[0]=new THREE.Mesh(whitecoin1_geo,whitecoin1_material);
    coins[0].position.set(0,5,10);
    scene.add(coins[0]);

    var whitecoin2_geo=new THREE.CylinderGeometry(2,2,1,32);
    var whitecoin2_material = new THREE.MeshPhongMaterial({ ambient: 0x050505, color: 0xffffff, specular: 0x555555, shininess: 30});
    coins[1]=new THREE.Mesh(whitecoin2_geo,whitecoin2_material);
        coins[1].position.set(-10,5,0);
    scene.add(coins[1]);

    var whitecoin3_geo=new THREE.CylinderGeometry(2,2,1,32);
    var whitecoin3_material = new THREE.MeshPhongMaterial({ ambient: 0x050505, color: 0xffffff, specular: 0x555555, shininess: 30});
    coins[2]=new THREE.Mesh(whitecoin3_geo,whitecoin3_material);
    coins[2].position.set(0,5,-10);
    scene.add(coins[2]);

    var whitecoin4_geo=new THREE.CylinderGeometry(2,2,1,32);
    var whitecoin4_material = new THREE.MeshPhongMaterial({ ambient: 0x050505, color: 0xffffff, specular: 0x555555, shininess: 30});
    coins[3]=new THREE.Mesh(whitecoin4_geo,whitecoin4_material);
    coins[3].position.set(10,5,0);
    scene.add(coins[3]);

    var redcoin_geo=new THREE.CylinderGeometry(2,2,1,32);
    var redcoin_material=new THREE.MeshPhongMaterial({ ambient: 0x050505, color: 0xff0000, specular: 0x555555, shininess: 30});
    coins[4]=new THREE.Mesh(redcoin_geo,redcoin_material);
    coins[4].position.set(0,5,0);
    scene.add(coins[4]);

    var blackcoin1_geo=new THREE.CylinderGeometry(2,2,1,32);
    var blackcoin1_material=new THREE.MeshPhongMaterial({ ambient: 0x050505, color: 0x000000, specular: 0x555555, shininess: 30});
    coins[5]=new THREE.Mesh(blackcoin1_geo,blackcoin1_material);
    coins[5].position.set(7.07,5,-7.07);
    scene.add(coins[5]);

    var blackcoin2_geo=new THREE.CylinderGeometry(2,2,1,32);
    var blackcoin2_material=new THREE.MeshPhongMaterial({ ambient: 0x050505, color: 0x000000, specular: 0x555555, shininess: 30});
    coins[6]=new THREE.Mesh(blackcoin2_geo,blackcoin2_material);
    coins[6].position.set(7.07,5,7.07);
    scene.add(coins[6]);

    var blackcoin3_geo=new THREE.CylinderGeometry(2,2,1,32);
    var blackcoin3_material=new THREE.MeshPhongMaterial({ ambient: 0x050505, color: 0x000000, specular: 0x555555, shininess: 30});
    coins[7]=new THREE.Mesh(blackcoin3_geo,blackcoin3_material);
    coins[7].position.set(-7.07,5,7.07);
    scene.add(coins[7]);

    var blackcoin4_geo=new THREE.CylinderGeometry(2,2,1,32);
    var blackcoin4_material=new THREE.MeshPhongMaterial({ ambient: 0x050505, color: 0x000000, specular: 0x555555, shininess: 30});
    coins[8]=new THREE.Mesh(blackcoin4_geo,blackcoin4_material);
    coins[8].position.set(-7.07,5,-7.07);
    scene.add(coins[8]);

    var striker_geo=new THREE.CylinderGeometry(2,2,1,32);
    var striker_material=new THREE.MeshPhongMaterial({ ambient: 0x050505, color: 0xC0C0C0, specular: 0x555555, shininess: 30});
    striker_mesh=new THREE.Mesh(striker_geo,striker_material);
    striker_mesh.position.set(15,5,23);
    scene.add(striker_mesh);

    var hole1_geo =new THREE.CylinderGeometry(2.5,2.5,1,32);
    var hole1_material=new THREE.MeshPhongMaterial({ ambient: 0x050505, color: 0x1a3300, specular: 0x555555, shininess: 30});
    holes[0]=new THREE.Mesh(hole1_geo,hole1_material);
    holes[0].position.set(32.5,5,-32.5);
    scene.add(holes[0]);

    var hole2_geo =new THREE.CylinderGeometry(2.5,2.5,1,32);
    var hole2_material=new THREE.MeshPhongMaterial({ ambient: 0x050505, color: 0x1a3300, specular: 0x555555, shininess: 30});
    holes[1]=new THREE.Mesh(hole2_geo,hole2_material);
    holes[1].position.set(32.5,5,32.5);
    scene.add(holes[1]);

    var hole3_geo =new THREE.CylinderGeometry(2.5,2.5,1,32);
    var hole3_material=new THREE.MeshPhongMaterial({ ambient: 0x050505, color: 0x1a3300, specular: 0x555555, shininess: 30});
    holes[2]=new THREE.Mesh(hole3_geo,hole3_material);
    holes[2].position.set(-32.5,5,32.5);
    scene.add(holes[2]);

    var hole4_geo =new THREE.CylinderGeometry(2.5,2.5,1,32);
    var hole4_material=new THREE.MeshPhongMaterial({ ambient: 0x050505, color: 0x1a3300, specular: 0x555555, shininess: 30});
    holes[3]=new THREE.Mesh(hole4_geo,hole4_material);
    holes[3].position.set(-32.5,5,-32.5);
    scene.add(holes[3]);

    var text2=document.createElement('div');
    text2.style.position='absolute'
    text2.style.width=100;
    text2.style.height=100;
    text2.style.backgroundcolor="blue";
    text2.innerHTML=" hi";
    text2.style.top=200+'px';
    text2.style.left=200+'px';
    document.body.appendChild(text2);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    window.addEventListener("keydown",onkeydown,false);
    requestAnimationFrame(render);
//    render();
}

function onkeydown(e)
{
//    console.log('hi');
    if(e.keyCode == 37)
    {    
    	camera.position.set(0,40,50);
    	camera.lookAt(scene.position);
    	camera.up.set(0,-1,0);
        coin_view_flag=false;
    }
    else if(e.keyCode == 38)
    {
         camera.position.x = 0;
        camera.position.y = 80;
        camera.position.z = 0;
        camera.lookAt(scene.position);
        camera.up.set(0,0,-1);
        coin_view_flag=false;
    //    camera.lookAt(0,-10,0);    
    }
    else if(e.keyCode == 39)
    {    
//        camera.position.set(striker_mesh.position.x,striker_mesh.position.y+2.1,striker_mesh.position.z+2.1)
//        camera.lookAt(scene.position);
//        camera.up.set(0,1,0);
        coin_view_flag=true;
    }
    else if(e.keyCode == 40)
    {    
        camera.position.set(0,50,40);
        camera.lookAt(scene.position);
        camera.up.set(0,1,0);
        coin_view_flag=false;
    }
    else if(e.keyCode==81)
        striker_mesh.position.x-=2;
    else if(e.keyCode==69)
        striker_mesh.position.x+=2;
    else if(e.keyCode == 83)
    {    
//        console.log('slow speed');
        striker_speed-=5;
//        console.log(striker_speed);
    }
    else if(e.keyCode == 70)
    {
//        console.log('fast speed');   
        striker_speed+=5;
    }
    else if(e.keyCode == 65)
    {    
//        console.log('dec angle');
        striker_angle-=15;
//        console.log(striker_angle);
    }
    else if(e.keyCode == 87)
    {
//        console.log('inc angle');
        striker_angle+=15;
//        console.log(striker_angle);
    }
    else if(e.keyCode == 13)
    {    
//        console.log('entered');
        shoot_status=1;
//        striker_mesh.position.x=15;
//        striker_mesh.position.z=23;
//        striker_mesh.position.y=5;
    }
   render();
}

function render() {
	    renderer.render( scene, camera );
        if(coin_view_flag==true)
        {
            camera.position.set(striker_mesh.position.x,striker_mesh.position.y+2.1,striker_mesh.position.z+2.1)
            camera.lookAt(scene.position);
            camera.up.set(0,1,0);
        }
        window.addEventListener("keydown",onkeydown,false);
}

function animate(){
//    window.setTimeout(update(),10000);
    if(shoot_status==1){
//    console.log('entered');
//    console.log(striker_speed);
//    var i;
    if(striker_flag == false)
    {
    for(i=0;i<9;i++)
    {
        if(Math.sqrt(((coins[i].position.x-striker_mesh.position.x)*(coins[i].position.x-striker_mesh.position.x))+((coins[i].position.z-striker_mesh.position.z)*(coins[i].position.z-striker_mesh.position.z)))<=4)
        {
            striker_flag=true;
            break;
        }
    }
    }
    if(striker_flag == false){
    if(striker_mesh.position.x>=33 && Math.abs(striker_mesh.position.z)<33)
        striker_angle=180-striker_angle;
    else if(striker_mesh.position.z<=-33 && Math.abs(striker_mesh.position.x)<33)
        striker_angle=-striker_angle;
    else if(striker_mesh.position.x<=-33 && Math.abs(striker_mesh.position.z)<33)
        striker_angle=striker_angle-180;
    else if(striker_mesh.position.z>=33 && Math.abs(striker_mesh.position.x)<33)
        striker_angle=360-striker_angle;
//    striker_speed-=2;
    if(hole_flag==false)
    {
    for(l=0;l<4;l++)
    {
        console.log(holes[l].position.x, holes[l].position.z);
        if(Math.sqrt(((striker_mesh.position.x-holes[l].position.x)*(striker_mesh.position.x-holes[l].position.x))+((striker_mesh.position.z-holes[l].position.z)*(striker_mesh.position.z-holes[l].position.z)))<=2)
        {
            console.log('entered hole condition');
            hole_flag=true;
            break;
        }
    }
    }
    if(hole_flag==false)
    {
        striker_mesh.position.x+=striker_speed*Math.cos(striker_angle*Math.PI/180)*0.01;
        striker_mesh.position.z-=striker_speed*Math.sin(striker_angle*Math.PI/180)*0.01;
    }
    else if(hole_flag==true)
    {
        striker_mesh.position.set(15,5,23);
        shoot_status=0;
        hole_flag=false;
        console.log(score);
    }
    }
    else
    {
//        console.log('entered');
    //    var index = collision_coin();
//        console.log(i);
//        var v;
        v=velocity[i];
        velocity[i]=striker_speed;
        striker_speed=v;
        if(coins_flag1==false)
        {
            for(j=0;j<9;j++)
            {
                if(i==j)
                    continue;
                else if(Math.sqrt(((coins[i].position.x-coins[j].position.x)*(coins[i].position.x-coins[j].position.x))+((coins[i].position.z-coins[j].position.z)*(coins[i].position.z-coins[j].position.z)))<=4)
                {
                    coins_flag1=true;
                    break;
                }
            }
        }
        if(coins_flag1==false)
        {
//            coins[i].position.x+=velocity[i]*Math.cos(striker_angle*Math.PI/180)*0.01;
//            coins[i].position.z-=velocity[i]*Math.sin(striker_angle*Math.PI/180)*0.01;
            if(hole_flag==false)
            {
            for(l=0;l<4;l++)
            {
                if(Math.sqrt(((coins[i].position.x-holes[l].position.x)*(coins[i].position.x-holes[l].position.x))+((coins[i].position.z-holes[l].position.z)*(coins[i].position.z-holes[l].position.z)))<=2)
                {
                    hole_flag=true;
                    break;
                }
            }
            }       
            if(hole_flag==true)
            {
                if(i==4)
                    score+=20;
                else
                    score+=5;
                striker_mesh.position.set(15,5,23);
                shoot_status=0;
                coins_flag1=false;
                striker_flag=false;
                hole_flag=false;
                console.log(score);
            }
            else if(hole_flag==false)
            {
                coins[i].position.x+=velocity[i]*Math.cos(striker_angle*Math.PI/180)*0.01;
                coins[i].position.z-=velocity[i]*Math.sin(striker_angle*Math.PI/180)*0.01;
            }
            else if(coins[i].position.z<=-33)
            {    velocity[i]=0;
                striker_mesh.position.set(15,5,23);
                shoot_status=0;
                coins_flag1=false;
                striker_flag=false;
            }
        }
        else if(coins_flag1==true)
        {
            v=velocity[i];
            velocity[i]=velocity[j];
            velocity[j]=v;
            if(coins_flag2==false)
            {
                for(k=0;k<9;k++)
                {
                    if(k==j || k==i)
                        continue;
                    else if(Math.sqrt(((coins[j].position.x-coins[k].position.x)*(coins[j].position.x-coins[k].position.x))+((coins[j].position.z-coins[k].position.z)*(coins[j].position.z-coins[k].position.z)))<=4)
                    {
                        console.log('entered 2nd collision');
                        coins_flag2=true;
                        break;
                    }
                }
            }
            if(coins_flag2==false)
            {
//                coins[j].position.x+=velocity[j]*Math.cos(striker_angle*Math.PI/180)*0.01;
//                coins[j].position.z-=velocity[j]*Math.sin(striker_angle*Math.PI/180)*0.01;
                if(hole_flag==false)
                {
                    for(l=0;l<4;l++)
                    {
                        if(Math.sqrt(((coins[j].position.x-holes[l].position.x)*(coins[j].position.x-holes[l].position.x))+((coins[j].position.z-holes[l].position.z)*(coins[j].position.z-holes[l].position.z)))<=2)
                        {
                            hole_flag=true;
                            break;
                        }
                    }
                }
                if(hole_flag==false)
                {
                    coins[j].position.x+=velocity[j]*Math.cos(striker_angle*Math.PI/180)*0.01;
                    coins[j].position.z-=velocity[j]*Math.sin(striker_angle*Math.PI/180)*0.01;
                }
                else if(hole_flag==true)
                {
                    shoot_status=0;
                    striker_mesh.position.set(15,5,23);
                    hole_flag=false;
                    coins_flag1=false;
                    coins_flag2=false;
                    striker_flag=false;
                    console.log(score);
                }
                else if(coins[j].position.z<=-33)
                {    
                    velocity[j]=0;
                    striker_mesh.position.set(15,5,23);
                    shoot_status=0;
                    striker_flag=false;
                }
            }
            else if(coins_flag2==true)
            {
                console.log('entered if condition');
                v=velocity[j];
                velocity[j]=velocity[k];
                velocity[k]=v;
//                console.log(velocity[j]);
//                console.log(velocity[k]);
                console.log(i,j,k);
//                console.log(coins[k].position.x,coins[k].position.z);
//                coins[j].position.x+=velocity[j]*Math.cos(striker_angle*Math.PI/180)*0.01;
//                coins[j].position.z-=velocity[j]*Math.sin(striker_angle*Math.PI/180)*0.01;
//                coins[k].position.x+=velocity[k]*Math.cos(striker_angle*Math.PI/180)*0.01;
//                coins[k].position.z-=velocity[k]*Math.sin(striker_angle*Math.PI/180)*0.01;
                if(hole_flag==false)
                {
                    for(l=0;l<4;l++)
                    {
                        if(Math.sqrt(((coins[k].position.x-holes[l].position.x)*(coins[k].position.x-holes[l].position.x))+((coins[k].position.z-holes[l].position.z)*(coins[k].position.z-holes[l].position.z)))<=2)
                        {
                            hole_flag=false;
                            break;
                        }
                    }
                }
                if(hole_flag==false)
                {
                    coins[k].position.x+=velocity[k]*Math.cos(striker_angle*Math.PI/180)*0.01;
                    coins[k].position.z-=velocity[k]*Math.sin(striker_angle*Math.PI/180)*0.01;
                }
                else if(hole_flag==true)
                {
                    if(k==4)
                        score+=20;
                    else
                        score+=5;
                    striker_mesh.position.set(15,5,23);
                    shoot_status=0;
                    coins_flag2=false;
                    coins_flag1=false;
                    striker_flag=false;
                    hole_flag=false;
                    console.log(score);
                }
                if(Math.abs(coins[k].position.z)>33 || Math.abs(coins[k].position.x)>33)
                {
                    velocity[k]=0;
                    striker_mesh.position.set(15,5,23);
                    shoot_status=0;
                    coins_flag2=false;
                    coins_flag1=false;
                    striker_flag=false;
                    hole_flag=false;
                }
            }
        }
    //    if(coins[i].position.z<=-33)
    //        velocity[i]=0;
        }
    }
    render();
    requestAnimationFrame(animate);
}