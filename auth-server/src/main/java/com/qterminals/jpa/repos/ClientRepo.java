package com.qterminals.jpa.repos;

import com.qterminals.jpa.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientRepo extends JpaRepository<Client, String> {
    Optional<Client> findByClientId(String clientId);
}
