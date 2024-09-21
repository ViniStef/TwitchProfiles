export const handleSearch = async () => {
    let usuario;

    try {         
            document.querySelector('.result__loading').style.display = 'inline';
            document.querySelector('.result__infos').style.display = 'none';
            document.querySelector('.results__container').classList.add('searched');

            const canalOuUsuarioVal = document.querySelector('#input__search').value;

            if (usuario === canalOuUsuarioVal) {
                return stop();
            }

            usuario = "";

            if (usuario !== canalOuUsuarioVal) {
                document.querySelector('#infos__match').textContent = ''; 
                document.querySelector('#infos__similar').textContent = ''; 
                usuario = canalOuUsuarioVal;
                document.querySelector('#canalOuUsuario').value = "";
            }

    } catch (error) {
        console.log("Something went wrong while trying to handle information.", error);
    } finally {
        document.querySelector('#input__submit').disabled = true; 
        return usuario;
    }
};