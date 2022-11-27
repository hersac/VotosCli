package hs.mintic.registraduria.voto;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import hs.mintic.registraduria.candidato.Candidato;
import hs.mintic.registraduria.candidato.CandidatoRepository;
import hs.mintic.registraduria.mesa.Mesa;
import hs.mintic.registraduria.mesa.MesaRepository;
import hs.mintic.registraduria.partido.Partido;
import hs.mintic.registraduria.partido.PartidoRepository;

@CrossOrigin(origins = "http://localhost:9000/", methods= {RequestMethod.GET,RequestMethod.POST} )
@RestController
@RequestMapping("/data")
public class VotoController{

    //Repositorios

    @Autowired
    private VotoRepository votoRepositorio;

    @Autowired
    private CandidatoRepository candidatoRepositorio;

    @Autowired
    private MesaRepository mesaRepository;

    @Autowired
    private PartidoRepository partidoRepository;


    //Metodos GET

    @GetMapping("/votos")
    public List<Voto> listarVotos(){
        return votoRepositorio.findAll();
    }

    @GetMapping("/votos/{votoId}")
    public Voto votoPorId(@PathVariable String votoId){
        return votoRepositorio.findById(votoId).get(); 
    }

    @GetMapping("/candidatos")
    public List<Candidato> listarCandidatos(){
        return candidatoRepositorio.findAll();
    }

    @GetMapping("/candidatos/{candId}")
    public Candidato candidatoPorId(@PathVariable String candId){
        return candidatoRepositorio.findById(candId).get();
    }

    @GetMapping("/partidos")
    public List<Partido> listarPartidos(){
        return partidoRepository.findAll();
    }

    @GetMapping("/partidos/{partyId}")
    public Partido partidoPorId(@PathVariable String partyId){
        return partidoRepository.findById(partyId).get();
    }

    @GetMapping("/mesas")
    public List<Mesa> listarMesas(){
        return mesaRepository.findAll();
    }

    @GetMapping("/mesas/{numero_mesa}")
    public Mesa mesaPorId(@PathVariable String numero_mesa){
        return mesaRepository.findById(numero_mesa).get();
    }

    //Metodos POST

    @PostMapping("/addVoto/mesa/{numero_mesa}/candidato/{id_cand}")
    public Voto addVoto(@PathVariable String numero_mesa, @PathVariable String id_cand, @RequestBody Voto voto){
        Mesa mesaVoto = this.mesaRepository.findById(numero_mesa).get();
        Candidato candidatoVoto = this.candidatoRepositorio.findById(id_cand).get();
        voto.setNumero_mesa(mesaVoto);
        voto.setId_cand(candidatoVoto);
        votoRepositorio.save(voto);
        return voto;
    }

    @PostMapping("/addCandidato/partido/{partyId}")
    public Candidato addCandidato(@PathVariable String partyId, @RequestBody Candidato candidato){
        Partido partidoCandidato = this.partidoRepository.findById(partyId).get();
        candidato.setPartyCand(partidoCandidato);
        candidatoRepositorio.save(candidato);        
        return candidato;
    }

    @PostMapping("/addMesa/candidato/{id_cand}")
    public Mesa addMesa(@PathVariable String id_cand, @RequestBody Mesa mesa){
        Candidato candidatoMesa = this.candidatoRepositorio.findById(id_cand).get();
        mesa.setId_cand(candidatoMesa);
        mesaRepository.save(mesa);
        return mesa;
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/addPartido")
    public Partido addPartido(@RequestBody Partido partido){
        partidoRepository.save(partido);
        return partido;
    }

    //Metodos PUT
    @PutMapping("/updatePartido/{partyId}")
    public Partido updatePartido(@PathVariable String partyId, @Validated @RequestBody Partido partidoDescripcion) {
        Partido partido = partidoRepository.findById(partyId).orElse(null);
        if (partido!=null) {
            partido.setPartyName(partidoDescripcion.getPartyName());
            partido.setSlogan(partidoDescripcion.getSlogan());
            return partidoRepository.save(partido);
        } else {
           return null; 
        }
    }

    @PutMapping("/updateCandidato/{candId}/partido/{partyId}")
    public Candidato updatecandidato(@PathVariable String candId, @PathVariable String partyId, @Validated @RequestBody Candidato candidatoDetalle){
        Candidato candidato = candidatoRepositorio.findById(candId).orElse(null);
        Partido partido = partidoRepository.findById(partyId).get();

        if (candidato!=null) {
            candidato.setIdentif(candidatoDetalle.getIdentif());
            candidato.setResoNumber(candidatoDetalle.getResoNumber());
            candidato.setPartyCand(partido);
            candidato.setCandName(candidatoDetalle.getCandName());
            candidato.setCandLastName(candidatoDetalle.getCandLastName());
            return candidatoRepositorio.save(candidato);
        } else {
            return null;
            
        }       
    }

    @PutMapping("/updateMesa/{mesaId}/candidato/{candId}")
    public Mesa updateMesa(@PathVariable String mesaId, @PathVariable String candId, @Validated @RequestBody Mesa mesaDetalles){
        Mesa mesa = mesaRepository.findById(mesaId).orElse(null);
        Candidato candidato = candidatoRepositorio.findById(candId).get();

        if(mesa!=null){
            mesa.setInscNumber(mesaDetalles.getInscNumber());
            mesa.setId_cand(candidato);
            return mesaRepository.save(mesa);
        }else{
            return null;
        }
    }

    @PutMapping("/updateVoto/{votoId}/mesa/{mesaId}/candidato/{candId}")
    public Voto updateVoto(@PathVariable String votoId, @PathVariable String mesaId, @PathVariable String candId, @Validated @RequestBody Voto votoDetalles){
        Voto voto = votoRepositorio.findById(votoId).orElse(null);
        Mesa mesa = mesaRepository.findById(mesaId).get();
        Candidato candidato = candidatoRepositorio.findById(candId).get();

        if (voto!=null) {
            voto.setUser_ident(votoDetalles.getUser_ident());
            voto.setId_cand(candidato);
            voto.setNumero_mesa(mesa);
            return votoRepositorio.save(voto);
        } else {
            return null;
        }

    }

    //Metodos Delete
    @DeleteMapping("/borrarPartidos")
    public String borrarPartidos(){
        partidoRepository.deleteAll();
        return "Se borraron todos los registros";
    }

    @DeleteMapping("/borrarPartido/{partyId}")
    public String borrarPartido(@PathVariable String partyId){
        partidoRepository.deleteById(partyId);
        return "Se ha borrado el partido Exitosamente";
    }
    
    @DeleteMapping("/borrarCandidatos")
    public String borrarCandidatos(){
        candidatoRepositorio.deleteAll();     
        return "Se borraron todos los registros";
    }

    @DeleteMapping("/borrarCandidato/{candId}")
    public String borrarCandidato(@PathVariable String candId){
        candidatoRepositorio.deleteById(candId);
        return "Se ha borrado al candidato Exitosamente";
    }

    @DeleteMapping("/borrarMesas")
    public String borrarMesas(){
        mesaRepository.deleteAll();     
        return "Se borraron todos los registros";
    }

    @DeleteMapping("/borrarMesa/{numero_mesa}")
    public String borrarMesa(@PathVariable String numero_mesa){
        mesaRepository.deleteById(numero_mesa);
        return "Se ha borrado la mesa Exitosamente";
    }

    @DeleteMapping("/borrarVotos")
    public String borrarVotos(){
        votoRepositorio.deleteAll();
        return "Se borraron todos los registros";
    }

    @DeleteMapping("/borrarVoto/{votoId}")
    public String borrarVoto(@PathVariable String votoId){
        votoRepositorio.deleteById(votoId);
        return "Se ha borrado el voto Exitosamente";
    }


}
