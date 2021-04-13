window.onload=function(){
  /*  var num=document.getElementById("menu").offsetTop;
    var scrollTop=document.getElementById("menu").scrollTop;
    if(num>=scrollTop){
        document.getElementById("menu").style.position="fixed";
    }
*/
    //添加菜品
    var none=function(){
        document.getElementById("addWindow").style.display="none";
    }
    document.getElementById("outAdd").onclick=function (){
        document.getElementById("addWindow").style.display="block";
    }
            document.getElementById("menuAdd").onclick=function(){
                var addName=document.getElementById("nameInput").value;
                var addPrice=document.getElementById("priceInput").value;
                var addDesc=document.getElementById("descInput").value;
                var addTypename=document.getElementById("typenameInput").value;
                var addId=document.getElementById("idInput").value;
        $.ajax({
            url:"http://118.195.129.130:3000/food/add",
             dataType:"json",
             type:"post",
             async:"true",
             data:{
                 name:String(addName),
                 price:Number(addPrice),
                 desc:String(addDesc),
                 typename:String(addTypename),
                 typeid:Number(addId)
             },
             success:function(data){
                 console.log(data); 
                 none();             
             },
             error:function(err){
                 console.log("错误");
                 alert("参数错误！")
                 none();   
             },
        })
        }

        //根据描述搜索菜品
    
        document.getElementById("text1").style.display="none";
    document.getElementById("menuSearch").onclick=function(){
        document.getElementById("text2").style.display="none";
        document.getElementById("text1").style.display="";
    var value=document.getElementById("menuInput").value;
    $.ajax({
        url:"http://118.195.129.130:3000/food/getInfoByKw",
        dataType:"json",
        type:"post",
        async:"true",
        data:{
            kw:String(value)
        },
        success:function(data){
            var searchFood=data.data;
            console.log(searchFood)         
           for (var n=0;n<=searchFood.length;n++){
                document.getElementById("text3").innerHTML+="<tr>"
                +"<td>"+searchFood[n].name+"</td>"+"<td>"+searchFood[n].price+"</td>"+"<td>"+searchFood[n].desc+"</td>"
                +"</tr>";   
            }
        },
        error:function(err){
            alert("数据有误")
        }
    })
} 


   //全部菜品
  var page=1;
   var per_page=50;
$.ajax({
    url:"http://118.195.129.130:3000/food/getInfoByPage",
    dataType:"json",
    type:"post",
    async:"true",
    data:{
        per_page: Number(per_page),
        page: Number(page) 
    },
    success:function(data){
       var food =data.data;
       console.log(food)
       //console.log(food.length);
       for(var i=0;i<=food.length;i++){
        document.getElementById("text").innerHTML+="<tr>"
        +"<td>"+food[i].name+"</td>"+"<td>"+food[i].price+"</td>"+"<td>"+food[i].desc+"</td>"+"<td>"
        +"</tr>";
       }
        },
    error: function(err){
       alert("加载数据失败");
        console.log("错误");
    },
})
}   