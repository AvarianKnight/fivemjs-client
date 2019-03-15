import { Relationship } from './enums/Relationship';

/**
 * Class to create and manage a relationship group. Useful to manage behavior between Peds.
 */
export class RelationshipGroup {
  /**
   * The hash of the relationship group
   */
  private hash: number;

  /**
   * Create a relationship group. Optionally pass a group hash.
   *
   * @param name Name of the relationship group.
   * @param groupHash Optional custom group hash (default: 0).
   */
  constructor(name: string, groupHash?: number) {
    AddRelationshipGroup(name, groupHash ? groupHash : 0);

    this.hash = groupHash ? groupHash : 0;
  }

  /**
   * Gets the hash of the relationship group.
   *
   * @returns The hash of this object.
   */
  public get Hash(): number {
    return this.hash;
  }

  /**
   * Get the relationship between two relationship groups.
   *
   * @param targetGroup The other relationship group.
   * @returns The relationship
   */
  public GetRelationshipBetweenGroups(targetGroup: RelationshipGroup): Relationship {
    return GetRelationshipBetweenGroups(this.Hash, targetGroup.Hash);
  }

  /**
   * Set the relationship group between this relationship group and another one.
   *
   * @param targetGroup The other relationship group.
   * @param relationship The desired relationship.
   * @param biDirectionally Whether the target group should have the same relationship towards this relationship group.
   */
  public SetRelationshipBetweenGroups(
    targetGroup: RelationshipGroup,
    relationship: Relationship,
    biDirectionally: boolean = false,
  ): void {
    SetRelationshipBetweenGroups(Number(relationship), this.Hash, targetGroup.Hash);

    if (biDirectionally) {
      SetRelationshipBetweenGroups(Number(relationship), targetGroup.Hash, this.Hash);
    }
  }

  /**
   * Clear the relationship between this relationship group and another.
   *
   * @param targetGroup The other relationship group.
   * @param relationship The desired relationship to clear.
   * @param biDirectionally Whether the target group should also clear the relationship.
   */
  public ClearRelationshipBetweenGroups(
    targetGroup: RelationshipGroup,
    relationship: Relationship,
    biDirectionally: boolean = false,
  ): void {
    ClearRelationshipBetweenGroups(Number(relationship), this.Hash, targetGroup.Hash);

    if (biDirectionally) {
      ClearRelationshipBetweenGroups(Number(relationship), targetGroup.Hash, this.Hash);
    }
  }

  /**
   * Remove this relationship group from the game. This will not delete this object.
   */
  public Remove(): void {
    RemoveRelationshipGroup(this.Hash);
  }
}