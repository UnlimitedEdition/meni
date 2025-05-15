function showPopup(title, ingredients, allergens) {
    document.getElementById('popup-title').textContent = title;
    document.getElementById('popup-ingredients').textContent = 'Sastojci: ' + ingredients;
    document.getElementById('popup-allergens').textContent = 'Alergeni: ' + allergens;
    document.getElementById('popup').classList.add('active');
    document.getElementById('overlay').classList.add('active');
  }
  
  function closePopup() {
    document.getElementById('popup').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
  }