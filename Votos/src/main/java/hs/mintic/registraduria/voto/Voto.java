package hs.mintic.registraduria.voto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import hs.mintic.registraduria.candidato.Candidato;
import hs.mintic.registraduria.mesa.Mesa;
import lombok.Data;

@Data
@Document(collection = "votos")
public class Voto{
    @Id
    private String votoId;

    @Field(name = "userIdent")
    private String user_ident;

    @DBRef
    private Candidato id_cand;

    @DBRef
    private Mesa numero_mesa;

    @Field(name = "numVotos")
    private int numVotos;

    public Voto(){
        super();
    }

    public Voto(String user_ident, Candidato id_cand, Mesa numero_mesa, int numVotos){
        super();
        this.user_ident=user_ident;
        this.id_cand=id_cand;
        this.numero_mesa=numero_mesa;
        this.numVotos=numVotos;
    }

    public String getUser_ident() {
        return user_ident;
    }

    public void setUser_ident(String user_ident) {
        this.user_ident = user_ident;
    }
    public Candidato getId_cand() {
        return id_cand;
    }

    public void setId_cand(Candidato id_cand) {
        this.id_cand = id_cand;
    }

    public Mesa getNumero_mesa() {
        return numero_mesa;
    }

    public void setNumero_mesa(Mesa numero_mesa) {
        this.numero_mesa = numero_mesa;
    }


}
