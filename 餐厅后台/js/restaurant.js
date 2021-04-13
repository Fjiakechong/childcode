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
                alert("参数错误！");
                 console.log("错误");              
                 none();   
             },
        })
        };
           //修改菜品
           var revise=function(){
            document.getElementById("addWindow").style.display="none";
        }           
        document.getElementById("reviseWindow").onclick=function(){
            document.getElementById("reviseWindow").style.display="block";
            document.getElementById("reviseMenuAdd").onclick=function(){
                var reviseName=document.getElementById("reviseNameInput").value;
                var revisePrice=document.getElementById("revisePriceInput").value;
                var reviseDesc=document.getElementById("reviseDescInput").value;
                var reviseTypename=document.getElementById("reviseTypenameInput").value;
                var reviseId=document.getElementById("reviseIdInput").value;
                var revise_id=document.getElementById("revise_idInput").value;
                $.ajax({
                    url:"http://118.195.129.130:3000/food/update",
                    dataType:"json",
                    type:"post",
                    async:"true",
                    data:{
                        name:String(reviseName),
                        price:Number(revisePrice),
                        desc:String(reviseDesc),
                        typename:String(reviseTypename),
                        typeid:Number(reviseId),
                        _id:String(revise_id)
                    },
                    success:function(data){
                        console.log(data),
                        alert("修改成功")
                        revise();
                    },
                    error:function(err){
                        console.log("修改失败"),
                        revise();
                    }
                })
            }
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
               +"<td>"+document.getElementById("delete").innerHTML+document.getElementById("revise").innerHTML+"</td>"+"</tr>";  

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
        +"<td>"+document.getElementById("delete").innerHTML+document.getElementById("revise").innerHTML+"</td>"+"</tr>";
        //删除菜品
      document.getElementById("menuDelete").onclick=function(){
        $.ajax({
        url:"http://118.195.129.130:3000/food/del",
        dataType:"json",
       type:"post",
       async:"true",
       data:{
            _id:String(food[i]._id)
       },
       success:function Delete(data){
       console.log(data),
       alert("删除成功！")
          console.log(data);
       },
       error:function nullDelete(err){
       console.log("删除失败")
        },
       })
       }
    };
        },
    error: function(err){
       alert("加载数据失败");
        console.log("错误");
    },
})
}   
    


