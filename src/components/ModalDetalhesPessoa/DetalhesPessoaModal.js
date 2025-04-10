import React, { useState } from "react";
import * as C from "./styles";

const DetalhesPessoaModal = ({ isOpen, onClose, pessoa }) => {
  if (!isOpen) return null;

  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (sectionName) => {
    setOpenSection((prev) => (prev === sectionName ? null : sectionName));
  };

  return (
    <C.ModalOverlay>
      <C.ModalContainer>
        <C.ModalHeader>
          <h2>Detalhes da Pessoa</h2>
          <C.CloseButton onClick={onClose}>&times;</C.CloseButton>
        </C.ModalHeader>
        <C.ModalBody>

          <C.Section>
            <C.SectionTitle onClick={() => toggleSection("pessoais")}>
              Dados Pessoais
            </C.SectionTitle>
            {openSection === "pessoais" && (
              <C.SectionContent>
                <div><strong>Nome:</strong> {pessoa.nome}</div><br />
                <div><strong>CPF:</strong> {pessoa.cpf}</div><br />
                <div><strong>RG:</strong> {pessoa.rg}</div><br />
                <div><strong>Data de Nascimento:</strong> {pessoa.datanascimento}</div><br />
                <div><strong>Nome da Mãe:</strong> {pessoa.nomemae}</div><br />
                <div><strong>Nome do Pai:</strong> {pessoa.nomepai}</div><br />
                <div><strong>Gênero:</strong> {pessoa.genero}</div><br />
                <div><strong>Estado Civil:</strong> {pessoa.estadocivil}</div><br />
              </C.SectionContent>
            )}
          </C.Section>

          <C.Section>
            <C.SectionTitle onClick={() => toggleSection("contato")}>
              Contato
            </C.SectionTitle>
            {openSection === "contato" && (
              <C.SectionContent>
                <div><strong>E-mail:</strong> {pessoa.email}</div><br />
                <div><strong>Telefone:</strong> {pessoa.telefone}</div><br />
                <div><strong>Celular:</strong> {pessoa.celular}</div><br />
                <div><strong>Endereço:</strong> {pessoa.endereco}</div><br />
              </C.SectionContent>
            )}
          </C.Section>

          <C.Section>
            <C.SectionTitle onClick={() => toggleSection("documentos")}>
              Documentos e Contratação
            </C.SectionTitle>
            {openSection === "documentos" && (
              <C.SectionContent>
                <div><strong>Número da Carteira de Trabalho:</strong> {pessoa.numerocarteiratrabalho}</div><br />
                <div><strong>Data de Admissão:</strong> {pessoa.dataadmissao}</div><br />
                <div><strong>Função:</strong> {pessoa.funcao}</div><br />
                <div><strong>Validade Documento:</strong> {pessoa.data_validade_documento}</div><br />
                <div><strong>Data ASO:</strong> {pessoa.data_aso}</div><br />
              </C.SectionContent>
            )}
          </C.Section>

          <C.Section>
            <C.SectionTitle onClick={() => toggleSection("treinamentos")}>
              Treinamentos
            </C.SectionTitle>
            {openSection === "treinamentos" && (
              <C.SectionContent>
                <div><strong>Treinamento Formação NR10:</strong> {pessoa.data_treinamento_formacao_nr10}</div><br />
                <div><strong>Reciclagem NR10:</strong> {pessoa.data_treinamento_reciclagem_nr10}</div><br />
                <div><strong>Treinamento Formação SEP:</strong> {pessoa.data_treinamento_formacao_sep}</div><br />
                <div><strong>Reciclagem SEP:</strong> {pessoa.data_treinamento_reciclagem_sep}</div><br />
                <div><strong>Treinamento NR35:</strong> {pessoa.data_treinamento_nr35}</div><br />
              </C.SectionContent>
            )}
          </C.Section>

          <C.Section>
            <C.SectionTitle onClick={() => toggleSection("responsaveis")}>
              Responsáveis
            </C.SectionTitle>
            {openSection === "responsaveis" && (
              <C.SectionContent>
                <div><strong>Coordenador Responsável:</strong> {pessoa.coordenador_responsavel}</div><br />
                <div><strong>EHS Responsável:</strong> {pessoa.ehs_responsavel}</div><br />
              </C.SectionContent>
            )}
          </C.Section>

        </C.ModalBody>
        <C.ModalFooter>
          <C.CancelButton onClick={onClose}>Fechar</C.CancelButton>
        </C.ModalFooter>
      </C.ModalContainer>
    </C.ModalOverlay>
  );
};

export default DetalhesPessoaModal;
