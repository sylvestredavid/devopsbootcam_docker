package fr.docker.exemple.controllers

import fr.docker.exemple.dto.requests.UserRequestDto
import fr.docker.exemple.services.interfaces.users.IUserCreateService
import fr.docker.exemple.services.interfaces.users.IUserSearchService
import fr.docker.exemple.dto.responses.UserDto
import org.springframework.web.bind.annotation.*

@RestController
@CrossOrigin(origins = ["*"])
@RequestMapping("/users")
class UserController(
        val userService: IUserCreateService,
        val searchService: IUserSearchService,
) {

    @PostMapping("/create")
    fun createUser(@RequestBody userCreateRequest: UserRequestDto): UserDto {
        return userService.createUser(userCreateRequest)
    }

    @GetMapping("")
    fun updateUserMdp(): List<UserDto> {
        return searchService.getAll()
    }
}