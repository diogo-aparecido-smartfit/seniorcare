package br.com.uniube.seniorcare.web.dto.response;

import br.com.uniube.seniorcare.domain.enums.Relationship;
import lombok.Data;
import java.util.UUID;

@Data
public class FamilyMemberResponse {
    private UUID id;
    private OrganizationSummary organization;
    private UserSummary user;
    private ElderlySummary elderly;
    private Relationship relationship;
}

