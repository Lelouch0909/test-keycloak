import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://54.83.193.128:8181/', // URL de Keycloak
    realm: 'rubberduck', // Nom du realm
    clientId: 'rubber-duck-client-react', // ID du client
});

export default keycloak;