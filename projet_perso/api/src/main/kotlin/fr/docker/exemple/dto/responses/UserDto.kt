package fr.docker.exemple.dto.responses

import fr.docker.exemple.entities.UserDb
import java.util.*

data class UserDto(
    val id: UUID?,
    val prenom: String,
    val email: String,
){
    companion object{
        fun fromDb(db: UserDb): UserDto {

            return UserDto(
                id = db.id,
                prenom = db.prenom,
                email = db.email,
            )
        }
    }
}
