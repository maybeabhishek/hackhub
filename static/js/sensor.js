function getSensor(){
  $.ajax({
    url:"/update",
    success: function(data){
        document.getElementById('refresh').click();
    }
  })
}
setInterval(getSensor, 5000);