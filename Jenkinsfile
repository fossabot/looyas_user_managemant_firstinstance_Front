pipeline {
    agent any

    environment{
     CONTAINER_FRONT_NAME ="starter_kit_front"
     CONTAINER_TAG = "latest"
     DOCKER_HUB_USER = "looyas"
    }
    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }
        stage('checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/Looyas/looyas_user_managemant_firstinstance_Front.git']]])
            }
        }

        stage('Fetch dependencies') {

            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {

                sh 'ng build'
            }
        }
        stage('Analysis  & security tests') {
           parallel {
              stage('Code review') {
                    steps {
                        script {
                            def scannerHome = tool 'sonar-scanner';

                            withSonarQubeEnv('sonar') {
                                sh "${scannerHome}/bin/sonar-scanner"
                            }
                        }
                    }
                  }
              stage('Security Test') {
                                          steps {
                                              script {
                                                 sh '''
                                                 #!/bin/bash
                                                 snyk monitor
                                                 ''' }
                                                 }
                                                  }
                                                  }
                                                  }

          stage("Image Prune") {
                    steps {
                        script {
                            try {
                            sh '''
                               #!/bin/bash
                               docker stop $CONTAINER_BACK_NAME"
                               '''
                            sh '''
                               #!/bin/bash
                                 docker image prune -f '''

                            } catch (error) {
                            }
                        }
                    }

                }
                stage('FrontEnd Image Build') {
                    steps {
                        script{
                            sh '''
                               #!/bin/bash
                               docker-compose build
                                '''
                            sh '''
                               #!/bin/bash
                                sleep 20
                                echo "Image build complete"
                               '''
                        }
                    }
                }
                stage("Deploy") {
                            parallel {
                                        stage('Container Security Test') {
                                            steps {
                                                 script {
                                                        sh '''
                                                             #!/bin/bash
                                                              snyk monitor --docker $CONTAINER_FRONT_NAME
                                                          '''
                                                             }
                                                   }
                                         }
                                        stage('Push to Docker Registry') {

                                            steps {
                                                script {
                                                    withDockerRegistry(credentialsId: 'Docker_Hub', url: "") {
                                                        sh "docker tag $CONTAINER_FRONT_NAME:$CONTAINER_TAG $DOCKER_HUB_USER/$CONTAINER_FRONT_NAME:$CONTAINER_TAG"
                                                        sh "docker push $DOCKER_HUB_USER/$CONTAINER_FRONT_NAME:$CONTAINER_TAG"
                                                    }
                                                }

                                            }
                                        }

                                        stage('Run Backend App') {
                                            steps{
                                                script{
                                                    sh '''
                                                       #!/bin/bash

                                                       docker-compose down
                                                       docker-compose up -d
                                                       '''
                                                    echo "Application backend started now"
                                                }
                                            }
                                        }
                                    }
                               }
                            }
            post {
                always {
                    emailext(to: 'adam.issaoui@looyas.com',
                            subject: "Jenkins : Failed Pipeline: ${currentBuild.fullDisplayName}",
                            body: '''${SCRIPT, template="managed:Groovy-Email-Template"}''')
                }
            }
        }
