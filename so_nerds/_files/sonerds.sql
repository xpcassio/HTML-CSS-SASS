-- MySQL Script generated by MySQL Workbench
-- Sun Oct 23 18:14:14 2016
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema sonerds
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sonerds
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sonerds` DEFAULT CHARACTER SET latin1 ;
USE `sonerds` ;

-- -----------------------------------------------------
-- Table `sonerds`.`usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sonerds`.`usuarios` ;

CREATE TABLE IF NOT EXISTS `sonerds`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NULL,
  `email` VARCHAR(200) NULL,
  `telefone` VARCHAR(45) NULL,
  `senha` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sonerds`.`profissionais`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sonerds`.`profissionais` ;

CREATE TABLE IF NOT EXISTS `sonerds`.`profissionais` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NULL,
  `email` VARCHAR(200) NULL,
  `senha` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sonerds`.`suporte`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sonerds`.`suporte` ;

CREATE TABLE IF NOT EXISTS `sonerds`.`suporte` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `assunto` VARCHAR(200) NULL,
  `hardware` TINYINT(1) NULL,
  `software` TINYINT(1) NULL,
  `problema_hardware` TEXT NULL,
  `problema_software` TEXT NULL,
  `mensagem` TEXT NULL,
  `anexos` TEXT NULL,
  `status` VARCHAR(45) NULL,
  `usuarios_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_suporte_usuarios_idx` (`usuarios_id` ASC),
  CONSTRAINT `fk_suporte_usuarios`
    FOREIGN KEY (`usuarios_id`)
    REFERENCES `sonerds`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sonerds`.`interacoes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sonerds`.`interacoes` ;

CREATE TABLE IF NOT EXISTS `sonerds`.`interacoes` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '	',
  `interacao` TEXT NULL,
  `anexos` VARCHAR(45) NULL,
  `tipo` VARCHAR(45) NULL,
  `suporte_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_interacoes_suporte1_idx` (`suporte_id` ASC),
  CONSTRAINT `fk_interacoes_suporte1`
    FOREIGN KEY (`suporte_id`)
    REFERENCES `sonerds`.`suporte` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
