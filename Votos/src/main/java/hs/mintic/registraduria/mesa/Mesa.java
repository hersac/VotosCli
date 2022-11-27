package hs.mintic.registraduria.mesa;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import hs.mintic.registraduria.candidato.Candidato;
import lombok.Data;

@Data
@Document(collection = "mesa")
public class Mesa{
    @Id
    private String mesaId;

    @Field(name = "inscNumber")
    private String inscNumber;

    @DBRef
    private Candidato id_cand;

    public Mesa(){
        super();
    }

    public Mesa(String inscNumber, Candidato id_cand){
        super();
        this.inscNumber=inscNumber;
        this.id_cand=id_cand;
    }

    public String getMesaId(){
        return mesaId;
    }

    public String getInscNumber() {
        return inscNumber;
    }

    public void setInscNumber(String inscNumber) {
        this.inscNumber = inscNumber;
    }
    public Candidato getId_cand() {
        return id_cand;
    }

    public void setId_cand(Candidato id_cand) {
        this.id_cand = id_cand;
    }
}


