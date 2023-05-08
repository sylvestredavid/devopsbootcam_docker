package fr.docker.exemple

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.ConfigurationPropertiesScan
import org.springframework.boot.runApplication

@SpringBootApplication
@ConfigurationPropertiesScan
class DockerExempleApplication

fun main(args: Array<String>) {
	runApplication<DockerExempleApplication>(*args)
}
