package com.qterminals.jpa.services;

import com.qterminals.jpa.entities.Client;
import com.qterminals.jpa.repos.ClientRepo;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClientServer {
    private ClientRepo clientRepo;

    public ClientServer(ClientRepo clientRepo) {
        this.clientRepo = clientRepo;
    }

    public Client findByClientId(String clientId){
        Optional<Client> client = this.clientRepo.findByClientId(clientId);

        if(client.isPresent()){
            return client.get();
        }

        return null;
    }
}
