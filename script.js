// Menu
((d) => {
  const $btnMenu = d.querySelector('.menu-btn');
  $menu = d.querySelector('.menu');
  $btnMenu.addEventListener('click', (e) => {
    $btnMenu.firstElementChild.classList.toggle('none');
    $btnMenu.lastElementChild.classList.toggle('none');
    $menu.classList.toggle('is-active');
  });

  d.addEventListener('click', (e) => {
    if (!e.target.matches('.menu a')) return false;

    $btnMenu.firstElementChild.classList.remove('none');
    $btnMenu.lastElementChild.classList.add('none');
    $menu.classList.remove('is-active');
  });
})(document);

/* ********** ContactForm ********** */
((d) => {
  // asignamos las clases a variables para poder trabajar con ellas
  const $form = d.querySelector('.contact-form'),
    $loader = d.querySelector('.contact-form-loader'),
    $response = d.querySelector('.contact-form-response');
  //  agregamos el event de enviar , quitamos el comportamiento por defecto del forn
  //  al loader le quitamos la clase none para que se muestre hacemos la peticion fetch
  //  y por el body pasamos a formdata el evento del target
  $form.addEventListener('submit', (e) => {
    e.preventDefault();
    $loader.classList.remove('none');
    fetch('https://formsubmit.co/ajax/victor_teo_17@hotmail.com', {
      method: 'POST',
      body: new FormData(e.target),
    })
      //  el primer then es para cuando la res es ok la convertamos a json sino rechazamos la promesa para que el
      // catch lo manipule
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      //  el segundo then es para que cuando todo este ok y true cambie la url con el #gracias y se muestre
      // el modal de gracias y reseteamos el form
      .then((json) => {
        console.log(json);
        location.hash = '#gracias';
        $form.reset();
      })
      // con el catch atrapamos el error sino tenemos statusText mandamos nuestro propio mensaje

      .catch((err) => {
        console.log(err);
        let message =
          err.statusText || 'Ocurrió un error al enviar, intenta nuevamente';
        $response.querySelector(
          'h3'
        ).innerHTML = `Error ${err.status}: ${message}`;
      })
      //  con el finally volvemos a poner el loader a none y cerramos agregando a la url
      // #close que dura 3s
      .finally(() => {
        $loader.classList.add('none');
        setTimeout(() => {
          location.hash = '#close';
        }, 3000);
      });
  });
})(document);
