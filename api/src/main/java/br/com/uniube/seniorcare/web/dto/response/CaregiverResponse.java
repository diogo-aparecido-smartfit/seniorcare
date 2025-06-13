package br.com.uniube.seniorcare.web.dto.response;

import lombok.Data;
import java.util.UUID;

@Data
public class CaregiverResponse {
    private UUID id;
    private OrganizationSummary organization;
    private UserSummary user;
    private String specialty;
}

