package hs.mintic.registraduria.partido;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

@Data
@Document(collection = "partido")
public class Partido{
    @Id
    private String partyId;

    @Field(name = "partyName")
    private String partyName;

    @Field(name = "slogan")
    private String slogan;

    public Partido(){
        super();
    }

    public Partido(String partyName, String slogan){
        super();
        this.partyName=partyName;
        this.slogan=slogan;
    }

    public String getPartyName() {
        return partyName;
    }

    public void setPartyName(String partyName) {
        this.partyName = partyName;
    }
    public String getSlogan() {
        return slogan;
    }

    public void setSlogan(String slogan) {
        this.slogan = slogan;
    }
}


