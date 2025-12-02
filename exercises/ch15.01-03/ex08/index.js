fetch('data.json')
  .then((res) => res.json())
  .then((data) => {
    document.getElementById('output').innerHTML = data.message;
  });
