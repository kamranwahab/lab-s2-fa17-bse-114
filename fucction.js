$(function(){
  
    loadrecepies();
    $("#add").on("click","#buttons",loadContent);
    
});

function loadContent(){
    $.ajax({
          url:"https://jsonplaceholder.typicode.com/posts/1",
          method:"GET",
          success: function(response){
              var result=$("#username");
              result.empty();
             
                   
           result.append("<h3>Title</h3><p id='title'>"+response.title+"</p><h3>User Id:</h3><p id='userId'>"+response.userId+"</p><h3>Body:</h3><p id='body' >"+response.body+"</p>");
  
              
             
  
          }
        })};