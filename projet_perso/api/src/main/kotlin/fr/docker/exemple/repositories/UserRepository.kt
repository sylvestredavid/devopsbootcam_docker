package fr.docker.exemple.repositories

import fr.docker.exemple.entities.UserDb
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

interface UserRepository: JpaRepository<UserDb, String> {
}