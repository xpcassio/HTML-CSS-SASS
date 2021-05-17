-- MySQL Script generated by MySQL Workbench
-- 06/13/16 10:36:48
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema metaweb_pro
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `metaweb_pro` ;

-- -----------------------------------------------------
-- Schema metaweb_pro
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `metaweb_pro` DEFAULT CHARACTER SET latin1 ;
USE `metaweb_pro` ;

-- -----------------------------------------------------
-- Table `metaweb_pro`.`cadastros`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `metaweb_pro`.`cadastros` ;

CREATE TABLE IF NOT EXISTS `metaweb_pro`.`cadastros` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(150) NULL,
  `email` VARCHAR(100) NULL,
  `telefone` VARCHAR(45) NULL,
  `atuacao` VARCHAR(45) NULL,
  `atuacao_extra` VARCHAR(100) NULL,
  `site_adm` VARCHAR(45) NULL,
  `servicos` VARCHAR(45) NULL,
  `servicos_extra` TEXT NULL,
  `dominios_clic` VARCHAR(45) NULL,
  `extra` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;