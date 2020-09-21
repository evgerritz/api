"""add image

Revision ID: fc345227a3a7
Revises: 6c7951d60cb9
Create Date: 2020-09-20 22:42:22.887588

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fc345227a3a7'
down_revision = '6c7951d60cb9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('students', sa.Column('image', sa.String(), nullable=True))
    op.alter_column('students', 'email',
               existing_type=sa.VARCHAR(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('students', 'email',
               existing_type=sa.VARCHAR(),
               nullable=False)
    op.drop_column('students', 'image')
    # ### end Alembic commands ###