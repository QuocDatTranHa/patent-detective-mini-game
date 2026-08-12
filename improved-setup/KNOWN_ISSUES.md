# Known Issues

Tracks known bugs, risks, fragile behavior, and testing gaps.

## Maintenance Rule

After every `update-handover` run, review every open item:
- Remove items that are fully resolved
- Update the status of items that changed this session
- **No open item may survive more than 2 phases without a status update**

Keep entries concise.

---

## Open Items

[No open items yet. Add entries as issues are discovered during implementation.]

Use this structure for each new issue:

```
### [Issue title]

**Affected behavior:** [what breaks or misbehaves]
**Current status:** [open | partially fixed | under investigation]
**Possible fix or next step:** [brief description]
**Introduced:** Phase [X]
**Last reviewed:** Phase [X]
```

---

## Known Risks

[Add project-specific risks here during planning. Update as the project evolves.]

### Portability

[Describe portability risk: what could break when the project is moved to a different machine or environment.]

### [Other risk category]

[Description.]

---

## Update Rule

When a bug or fragile behavior is found, add an entry with:
- issue title
- affected behavior
- current status
- possible fix or next step
- which phase introduced it

Remove or update issues once they are resolved.
