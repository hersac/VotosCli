package hs.mintic.registraduria.candidato;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import hs.mintic.registraduria.partido.Partido;
import lombok.Data;

@Data
@Document(collection = "candidato")
public class Candidato{
    @Id
    private String candId;

    @Field(name = "identif")
    private String identif;

    @Field(name = "resoNumber")
    private String resoNumber;

    @DBRef
    private Partido partyCand;

    @Field(name = "candName")
    private String candName;

    @Field(name = "candLastName")
    private String candLastName;

    public Candidato(){
        super();
    }

    public Candidato(String identif, String resoNumber, Partido partyCand, String candName, String candLastName){
        super();
        this.identif=identif;
        this.resoNumber=resoNumber;
        this.partyCand=partyCand;
        this.candName=candName;
        this.candLastName=candLastName;
    }


    public String getCandId(){
        return candId;
    }

    public String getIdentif() {
        return identif;
    }

    public void setIdentif(String identif) {
        this.identif = identif;
    }
    public String getResoNumber() {
        return resoNumber;
    }

    public void setResoNumber(String resoNumber) {
        this.resoNumber = resoNumber;
    }
    public Partido getPartyCand() {
        return partyCand;
    }

    public void setPartyCand(Partido partyCand) {
        this.partyCand = partyCand;
    }
    public String getCandName() {
        return candName;
    }

    public void setCandName(String candName) {
        this.candName = candName;
    }
    public String getCandLastName() {
        return candLastName;
    }

    public void setCandLastName(String candLastName) {
        this.candLastName = candLastName;
    }
}


