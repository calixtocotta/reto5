/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package reto3.reto3.ControladorWeb;

import java.util.Collections;
import java.util.Map;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author calix
 */
@RestController 
public class UserController {
 
    @GetMapping("/user")
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
//        return Collections.singletonMap("name", principal.getAttribute("login"));
        return Collections.singletonMap("name", principal.getAttribute("name"));
    }
    @GetMapping("/photo")
    public Map<String, Object> foto(@AuthenticationPrincipal OAuth2User principal) {
//        return Collections.singletonMap("name", principal.getAttribute("login"));
        return Collections.singletonMap("foto_id", principal.getAttribute("avatar_url"));
    }
    
   
    @GetMapping("/datos")
    public Map<String, Object> datos(@AuthenticationPrincipal OAuth2User principal) {
//        return Collections.singletonMap("name", principal.getAttribute("login"));
        return Collections.singletonMap("datos", principal);
    }

}
