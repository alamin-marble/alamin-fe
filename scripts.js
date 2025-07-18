document.addEventListener('mousemove', function(e) {
    try{
      let circle = document.getElementById('CountryName');
      let left = e.offsetX - 50;
      let top = e.offsetY - 150;
      circle.style.left = left + 'px';
      circle.style.top = top + 'px';
    } 
    catch (error) {
      console.error(error);
    } 
  });