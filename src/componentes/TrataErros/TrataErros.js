import PubSub from 'pubsub-js';

export default class TrataErros {
    publicaErros(erros) {
        erros.errors.forEach(erro => {
            PubSub.publish("erro-validacao", erro);
        });
    }
}
