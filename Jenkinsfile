pipeline {
  agent any

  tools {
    nodejs "node18"
  }

  stages {

    stage('Install') {
      steps {
        dir('ResumeBuilder') {
          sh 'npm install'
        }
      }
    }

    stage('Build') {
      steps {
        dir('ResumeBuilder') {
          sh 'npm run build'
        }
      }
    }

    stage('Deploy') {
      steps {
        sh '''
          set -e

          TMP_DIR=/tmp/admin_build_$(date +%s)
          mkdir -p $TMP_DIR

          cp -r ResumeBuilder/dist/* $TMP_DIR/

          sudo rm -rf /var/www/aryu_resumebuilder/resumebuilderadmin-reactjs/dist/*
          sudo cp -r $TMP_DIR/* /var/www/aryu_resumebuilder/resumebuilderadmin-reactjs/dist/

          rm -rf $TMP_DIR
        '''
      }
    }
  }
}

