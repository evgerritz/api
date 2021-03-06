"""Remove image_id

Revision ID: 6f312500021b
Revises: 6e003647d5f7
Create Date: 2021-02-28 12:08:37.790381

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6f312500021b'
down_revision = '6e003647d5f7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('person', 'image_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('person', sa.Column('image_id', sa.INTEGER(), nullable=True))
    # ### end Alembic commands ###