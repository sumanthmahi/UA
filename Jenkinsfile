pipeline {
    agent any

    environment {
        IMAGE_NAME = 'sumanthmahi/ua'
        IMAGE_TAG = 'latest'
        DOCKER_HUB_CREDENTIALS_ID = 'dockerhub-creds' // you’ll create this in Jenkins
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/sumanthmahi/UA.git', branch: 'main'

            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDENTIALS_ID}", usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    script {
                        docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_HUB_CREDENTIALS_ID}") {
                            docker.image("${IMAGE_NAME}:${IMAGE_TAG}").push()
                        }
                    }
                }
            }
        }
    }
}
