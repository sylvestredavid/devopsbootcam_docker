package fr.docker.exemple.dto.requests

import fr.docker.exemple.entities.UserDb
import org.springframework.security.crypto.bcrypt.BCrypt
import java.util.*

data class UserRequestDto(
    val id: UUID? = null,
    val prenom: String,
    val email: String,
    val mdp: String? = null,
){
    fun mapRequestToEntity(): UserDb {
        return UserDb(
            id = this.id,
            prenom = this.prenom,
            email = this.email,
            mdp = this.mdp?.let { BCrypt.hashpw(it, BCrypt.gensalt()) },
        )
    }
}
