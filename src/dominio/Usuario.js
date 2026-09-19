export class Usuario {
    constructor(login, senha) {
        this.login = login;
        this.senha = senha;
    }

    autenticar(login, senha) {
        if (this.login === login && this.senha === senha) {
            return true;
        } else {
            return false;
        }
    }

}
