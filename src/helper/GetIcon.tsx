import {
    FaFolder,
    FaFolderOpen,
    FaJs,
    FaReact,
    FaHtml5,
    FaCss3,
    FaSass,
    FaPython,
    FaJava,
    FaPhp,
    FaRust,
   
    FaDocker,
    FaGit,
    FaNpm,
    FaMarkdown,
    FaFile,
    FaDatabase,
    FaImage,
    FaFileCode,
    FaFileAlt,
    FaFileArchive,
    FaFilePdf,
    FaFileWord,
    FaFileExcel,
    FaFilePowerpoint,
    FaFileVideo,
    FaFileAudio,
  } from 'react-icons/fa';
  import {
    SiTypescript,
    SiJavascript,
    SiCplusplus,
    SiCsharp,
    SiKotlin,
    SiSwift,
    SiDart,
    SiRuby,
    SiScala,
    SiGradle,
    SiJenkins,
    SiTerraform,
    SiAnsible,
    SiKubernetes,
    SiGraphql,
    SiRedis,
    SiMongodb,
    SiPostgresql,
    SiMysql,
    SiFirebase,
  } from 'react-icons/si';
  import { FaGolang} from 'react-icons/fa6'
  interface IconProps {
    className?: string;
  }
  
 export const getFileIcon = (fileName: string, isOpen: boolean = false): JSX.Element => {
    // Get the file extension
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    
    // Common style for icons
    const iconStyle = "w-4 h-4";
  
    // First, check if it's a folder
    if (!extension || isOpen) {
      return isOpen ? <FaFolderOpen className={iconStyle} /> : <FaFolder className={iconStyle} />;
    }
  
    // Check for specific file names
    const specificFileNames: { [key: string]: JSX.Element } = {
      'dockerfile': <FaDocker className={iconStyle} />,
      'package.json': <FaNpm className={iconStyle} />,
      'package-lock.json': <FaNpm className={iconStyle} />,
      'yarn.lock': <FaNpm className={iconStyle} />,
      '.gitignore': <FaGit className={iconStyle} />,
      '.dockerignore': <FaDocker className={iconStyle} />,
      'docker-compose.yml': <FaDocker className={iconStyle} />,
      'docker-compose.yaml': <FaDocker className={iconStyle} />,
    };
  
    if (specificFileNames[fileName.toLowerCase()]) {
      return specificFileNames[fileName.toLowerCase()];
    }
  
    // Check extensions
    const extensionMap: { [key: string]: JSX.Element } = {
      // JavaScript and TypeScript
      'js': <SiJavascript className={iconStyle} color="#F7DF1E" />,
      'jsx': <FaReact className={iconStyle} color="#61DAFB" />,
      'ts': <SiTypescript className={iconStyle} color="#3178C6" />,
      'tsx': <FaReact className={iconStyle} color="#61DAFB" />,
  
      // Web
      'html': <FaHtml5 className={iconStyle} color="#E34F26" />,
      'css': <FaCss3 className={iconStyle} color="#1572B6" />,
      'scss': <FaSass className={iconStyle} color="#CC6699" />,
      'sass': <FaSass className={iconStyle} color="#CC6699" />,
  
      // Programming Languages
      'py': <FaPython className={iconStyle} color="#3776AB" />,
      'java': <FaJava className={iconStyle} color="#007396" />,
      'cpp': <SiCplusplus className={iconStyle} color="#00599C" />,
      'c': <SiCplusplus className={iconStyle} color="#A8B9CC" />,
      'cs': <SiCsharp className={iconStyle} color="#239120" />,
      'php': <FaPhp className={iconStyle} color="#777BB4" />,
      'rb': <SiRuby className={iconStyle} color="#CC342D" />,
      'rs': <FaRust className={iconStyle} color="#000000" />,
      'go': <FaGolang className={iconStyle} color="#00ADD8" />,
      'kt': <SiKotlin className={iconStyle} color="#0095D5" />,
      'swift': <SiSwift className={iconStyle} color="#FA7343" />,
      'dart': <SiDart className={iconStyle} color="#0175C2" />,
      'scala': <SiScala className={iconStyle} color="#DC322F" />,
  
      // Database
      'sql': <FaDatabase className={iconStyle} color="#336791" />,
      'sqlite': <FaDatabase className={iconStyle} />,
      'prisma': <FaDatabase className={iconStyle} />,
      'graphql': <SiGraphql className={iconStyle} color="#E10098" />,
  
      // Configuration
      'json': <FaFileCode className={iconStyle} color="#000000" />,
      'yaml': <FaFileCode className={iconStyle} />,
      'yml': <FaFileCode className={iconStyle} />,
      'toml': <FaFileCode className={iconStyle} />,
      'xml': <FaFileCode className={iconStyle} />,
      'gradle': <SiGradle className={iconStyle} />,
      'jenkinsfile': <SiJenkins className={iconStyle} />,
      'tf': <SiTerraform className={iconStyle} />,
      'hcl': <SiTerraform className={iconStyle} />,
  
      // Documentation
      'md': <FaMarkdown className={iconStyle} />,
      'txt': <FaFileAlt className={iconStyle} />,
      'pdf': <FaFilePdf className={iconStyle} color="#FF0000" />,
      'doc': <FaFileWord className={iconStyle} color="#2B579A" />,
      'docx': <FaFileWord className={iconStyle} color="#2B579A" />,
      'xls': <FaFileExcel className={iconStyle} color="#217346" />,
      'xlsx': <FaFileExcel className={iconStyle} color="#217346" />,
      'ppt': <FaFilePowerpoint className={iconStyle} color="#B7472A" />,
      'pptx': <FaFilePowerpoint className={iconStyle} color="#B7472A" />,
  
      // Images
      'png': <FaImage className={iconStyle} />,
      'jpg': <FaImage className={iconStyle} />,
      'jpeg': <FaImage className={iconStyle} />,
      'gif': <FaImage className={iconStyle} />,
      'svg': <FaImage className={iconStyle} />,
      'ico': <FaImage className={iconStyle} />,
  
      // Archives
      'zip': <FaFileArchive className={iconStyle} />,
      'rar': <FaFileArchive className={iconStyle} />,
      'gz': <FaFileArchive className={iconStyle} />,
      'tar': <FaFileArchive className={iconStyle} />,
      '7z': <FaFileArchive className={iconStyle} />,
  
      // Media
      'mp4': <FaFileVideo className={iconStyle} />,
      'mov': <FaFileVideo className={iconStyle} />,
      'avi': <FaFileVideo className={iconStyle} />,
      'mp3': <FaFileAudio className={iconStyle} />, 'wav': <FaFileAudio className={iconStyle} />,
      'flac': <FaFileAudio className={iconStyle} />,
      'ogg': <FaFileAudio className={iconStyle} />,
    };
  
    return extensionMap[extension] || <FaFile className={iconStyle} />;
  };
  
