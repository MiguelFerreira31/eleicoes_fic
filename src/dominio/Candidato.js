
export class Candidato{
    constructor (id,nome,numero){
        if(nome.length < 3){
            throw new Error('Nome do candidato deve ter pelo menos 3 caracteres')
 
        }
        this.id = id
        this.nome = nome
        this.numero = numero
       
    }
}