pipeline {
  agent any

  tools {
    nodejs "node18"
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Deploy') {
      steps {
        sh '''
          sudo rm -rf /var/www/aryu_resumebuilder/resumebuilderadmin-reactjs/dist/*
          sudo cp -r dist/* /var/www/aryu_resumebuilder/resumebuilderadmin-reactjs/dist/
        '''
      }
    }
  }
}

