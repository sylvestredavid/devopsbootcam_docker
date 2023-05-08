package fr.docker.exemple.services.impl.users

import fr.docker.exemple.dto.requests.UserRequestDto
import fr.docker.exemple.dto.responses.UserDto
import fr.docker.exemple.repositories.UserRepository
import fr.docker.exemple.services.interfaces.users.IUserCreateService
import org.springframework.stereotype.Service

@Service
class UserCreateService(
        val userRepository: UserRepository,
    ): IUserCreateService {

    override fun createUser(request: UserRequestDto): UserDto {
        return UserDto.fromDb(userRepository.save(request.mapRequestToEntity()))
    }
}